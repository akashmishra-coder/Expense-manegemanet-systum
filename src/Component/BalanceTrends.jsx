import React from "react";
import "./BalanceTrends.css";
import PaymentHistory from "./PaymentHistory";

const BalanceTrends = () => {
  // Mock data representing the chart points
  const chartData = [
    { label: "4 Jan", value: 0 },
    { label: "5 Jan", value: 105 },
    { label: "6 Jan", value: 90 },
    { label: "7 Jan", value: 155 },
    { label: "8 Jan", value: 135 },
    { label: "9 Jan", value: 205 },
    { label: "10 Jan", value: 115 },
    { label: "11 Jan", value: 90 },
    { label: "12 Jan", value: 155 },
    { label: "13 Jan", value: 135 },
    { label: "14 Jan", value: 205 },
    { label: "15 Jan", value: 320 },
  ];

  const yAxisLabels = [350, 300, 250, 200, 150, 100, 50, 0];
  const maxValue = 350;
  const chartWidth = 800;
  const chartHeight = 300;

  // Calculate coordinates for the SVG path
  const points = chartData.map((d, index) => {
    const x = (index / (chartData.length - 1)) * chartWidth;
    const y = chartHeight - (d.value / maxValue) * chartHeight;
    return { x, y };
  });

  const pathString = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");
  const areaString = `${pathString} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <div className="bt-container">
      <PaymentHistory />
      <div className="bt-card">
        {/* Header Section */}
        <div className="bt-header">
          <div className="bt-title-section">
            <h2 className="bt-title">Balance Trends</h2>
            <h1 className="bt-amount">$221,478</h1>
          </div>
          <div className="bt-stats">
            <span className="bt-stats-label">Last Month</span>
            <div className="bt-trend-positive">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              12.25%
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bt-chart-container">
          {/* Y-Axis */}
          <div className="bt-y-axis">
            {yAxisLabels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>

          <div className="bt-chart-body">
            {/* SVG Chart */}
            <svg
              className="bt-svg-chart"
              viewBox={`0 -10 ${chartWidth} ${chartHeight + 20}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#7b61ff" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Vertical Grid Lines */}
              {points.map((p, i) => (
                <line
                  key={`grid-${i}`}
                  x1={p.x}
                  y1="0"
                  x2={p.x}
                  y2={chartHeight}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}

              {/* Area Fill */}
              <path d={areaString} fill="url(#areaGradient)" />

              {/* Line Stroke */}
              <path
                d={pathString}
                fill="none"
                stroke="#7b61ff"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((p, i) => (
                <circle
                  key={`point-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#7b61ff"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

            {/* X-Axis Labels */}
            <div className="bt-x-axis">
              {chartData.map((d, index) => (
                <span key={index}>{d.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTrends;
