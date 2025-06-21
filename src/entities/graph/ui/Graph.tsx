import { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";
import { Checkbox, useMediaQuery } from "@mui/material";
import { DataSeries } from "../model/types";
import styles from "./_graph.module.scss";
import { usePlotlyStyles } from "../lib/plotlyStyles";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { DataSeriesTable } from "@/entities/table";
import katex from "katex";
import "katex/dist/katex.min.css";

type Props = {
  data: DataSeries[];
  title?: string;
};

const renderLaTeX = (text: string) => {
  text = text.replace(/(?<!\$)\$([^\$]+?)\$(?!\$)/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `<code>$${formula}$</code>`;
    }
  });

  return text;
};

const Graph = ({ data, title }: Props) => {
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({});
  const [showTable, setShowTable] = useState(false);
  const [viewLayout, setViewLayout] = useState<Partial<Plotly.Layout>>({});

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const plotlyStyles = usePlotlyStyles();

  useEffect(() => {
    if (!data.length) return;

    setVisibleSeries((prev) => {
      const updated = { ...prev };
      data.forEach((series) => {
        if (!(series.id in updated)) {
          updated[series.id] = true;
        }
      });
      return updated;
    });
  }, [data]);

  const toggleSeries = (id: string) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const plotData = useMemo(() => {
    return data.map((series) => ({
      x: series.data.map((point) => point.x),
      y: series.data.map((point) => point.y),
      type: "scattergl",
      mode: "lines+markers",
      name: series.id,
      marker: { color: series.color, size: 6 },
      line: { color: series.color, width: 2 },
      hovertemplate: `x: %{x:.3f}<br>y: %{y:.2e}<extra></extra>`,
      visible: visibleSeries[series.id] ? true : "legendonly",
    }));
  }, [data, visibleSeries]);

  const baseLayout: Partial<Plotly.Layout> = useMemo(() => {
    const xUnit = data[0]?.xUnit || "x";
    const yUnit = data[0]?.yUnit || "y";

    return {
      ...plotlyStyles,
      autosize: true,
      xaxis: {
        title: { text: xUnit },
        type: "linear",
        automargin: true,
      },
      yaxis: {
        title: { text: yUnit },
        type: "linear",
        automargin: true,
      },
      hovermode: "closest",
      dragmode: "pan",
      showlegend: false,
    };
  }, [data, plotlyStyles]);

  const handleRelayout = (event: Plotly.PlotRelayoutEvent) => {
    const newLayout: Partial<Plotly.Layout> = {};

    if (event["xaxis.range[0]"] !== undefined && event["xaxis.range[1]"] !== undefined) {
      newLayout.xaxis = {
        ...baseLayout.xaxis,
        range: [event["xaxis.range[0]"], event["xaxis.range[1]"]],
      };
    }

    if (event["yaxis.range[0]"] !== undefined && event["yaxis.range[1]"] !== undefined) {
      newLayout.yaxis = {
        ...baseLayout.yaxis,
        range: [event["yaxis.range[0]"], event["yaxis.range[1]"]],
      };
    }

    const hasX = event["xaxis.range[0]"] !== undefined && event["xaxis.range[1]"] !== undefined;
    const hasY = event["yaxis.range[0]"] !== undefined && event["yaxis.range[1]"] !== undefined;
    if (!hasX && !hasY) return;

    setViewLayout((prev) => ({ ...prev, ...newLayout }));
  };

  const mergedLayout = {
    ...baseLayout,
    ...viewLayout,
    height: isSmallScreen ? 400 : 600,
  };

  const config: Partial<Plotly.Config> = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["select2d", "lasso2d"],
    scrollZoom: true,
    doubleClick: "reset",
    displayModeBar: true,
  };

  return (
    <div className={styles.container}>
      <div className={styles.graph}>
        <div className={styles.graph__title}> {title || "График"}</div>
        <div className={styles.graph__legend}>
          {data.map((series) => (
            <label key={series.id}>
              <Checkbox
                checked={visibleSeries[series.id] ?? true}
                onChange={() => toggleSeries(series.id)}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: "clamp(12px, 1.5vw, 24px)",
                    color: series.color,
                  },
                }}
              />
              <span style={{ color: series.color }} dangerouslySetInnerHTML={{
                __html: renderLaTeX(series.id.toString()),
              }} />
            </label>
          ))}
        </div>

        <Plot
          data={plotData}
          layout={mergedLayout}
          useResizeHandler
          config={config}
          onRelayout={handleRelayout}
          className={styles.graph__plot}
        />
      </div>

      <SecondaryButton
        label={showTable ? "Скрыть таблицу" : "Показать таблицу"}
        type="button"
        onClick={() => setShowTable((prev) => !prev)}
      />

      {showTable && (
        <div data-color-mode="light">
          <DataSeriesTable data={data} />
        </div>
      )}
    </div>
  );
};

export default Graph

