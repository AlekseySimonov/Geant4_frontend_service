import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Checkbox, useMediaQuery } from "@mui/material";
import { DataSeries } from "../model/types";
import styles from "./_graph.module.scss";
import { usePlotlyStyles } from "../lib/plotlyStyles";

type Props = {
  data: DataSeries[];
};

export const Graph = ({ data }: Props) => {
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({});
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const plotlyStyles = usePlotlyStyles()

  useEffect(() => {
    if (!data.length) return;

    setVisibleSeries(prev => {
      const updated = { ...prev };
      data.forEach(series => {
        if (!(series.id in updated)) {
          updated[series.id] = true;
        }
      });
      return updated;
    });
  }, [data]);

  const toggleSeries = (id: string) => {
    setVisibleSeries(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const plotData = data
    .filter(series => visibleSeries[series.id])
    .map(series => ({
      x: series.data.map(point => point.x),
      y: series.data.map(point => point.y),
      type: 'scattergl',
      mode: "lines+markers",
      name: series.id,
      marker: { color: series.color, size: 6 },
      line: { color: series.color, width: 2 },
      hovertemplate: `x: %{x:.3f}<br>y: %{y:.2e}<extra></extra>`,
    }));

  const layout: Partial<Plotly.Layout> = {
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
  };

  const config: Partial<Plotly.Config> = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ["select2d", "lasso2d"],
    scrollZoom: true,
  };

  return (
    <div className={styles.graph}>
      <div className={styles.graph__legend}>
        {data.map(series => (
          <label key={series.id}>
            <Checkbox
              checked={visibleSeries[series.id] ?? true}
              onChange={() => toggleSeries(series.id)}
              sx={{
                padding: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: 'clamp(12px, 1.5vw, 24px)',
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
        layout={{
          ...layout,
          width: undefined,
          height: isSmallScreen ? 400 : 600,
        }}
        config={config}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        className={styles.graph__plot}
      />
    </div>
  );
};
