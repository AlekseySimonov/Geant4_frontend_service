import { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";
import { Checkbox, useMediaQuery } from "@mui/material";
import { DataSeries } from "../model/types";
import styles from "./_graph.module.scss";
import { usePlotlyStyles } from "../lib/plotlyStyles";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { DataSeriesTable } from "@/entities/table";

type Props = {
  data: DataSeries[];
};

export const Graph = ({ data }: Props) => {
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({});
  const [showTable, setShowTable] = useState(false);
  const [viewLayout, setViewLayout] = useState<Partial<Plotly.Layout>>({}); // храним текущий zoom/пан

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

  const baseLayout: Partial<Plotly.Layout> = useMemo(() => ({
    ...plotlyStyles,
    autosize: true,
    xaxis: {
      title: { text: data[0]?.yUnit || "x" },
      type: "linear",
      automargin: true,
    },
    yaxis: {
      title: { text: data[0]?.xUnit || "y" },
      type: "linear",
      automargin: true,
    },
    hovermode: "closest",
    dragmode: "pan",
    showlegend: false,
  }), [data, plotlyStyles]);

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

    setViewLayout((prev) => ({ ...prev, ...newLayout }));
  };

  const mergedLayout = {
    ...baseLayout,
    ...viewLayout,
    height: isSmallScreen ? 400 : 600,
  };

  const config: Partial<Plotly.Config> = {
    displaylogo: false,
    modeBarButtonsToRemove: ["select2d", "lasso2d"],
    scrollZoom: true,
    doubleClick: "reset",
  };

  return (
    <div className={styles.container}>
      <div className={styles.graph}>
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
              <span style={{ color: series.color }}>{series.id}</span>
            </label>
          ))}
        </div>

        <Plot
          data={plotData}
          layout={mergedLayout}
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

