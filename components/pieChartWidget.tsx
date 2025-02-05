"use client";

import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Cell, LabelList } from "recharts";
import Card from "./card";

const COLORS = ["#22c55e", "#0092d2", "#00a7b9", "#00b88f"];

const RADIAN = Math.PI / 180;

export default function PieChartWidget({
  title,
  data,
}: {
  title: string;
  data: any[];
}) {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y + 20}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    );
  };

  // Handling animation errors in the PieChart from Recharts
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <div>
      <Card title={title}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            fill="#f1f5f9"
            dataKey="value"
            nameKey="name"
          >
            <LabelList dataKey="name" position="inside" fill="white" />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Card>
    </div>
  );
}
