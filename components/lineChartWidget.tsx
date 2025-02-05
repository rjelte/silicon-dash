"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "./card";

const LineChartWidget = ({
  title,
  data,
  xKey,
  yKey,
  lineColor,
}: {
  title: string;
  data: any[];
  xKey: string;
  yKey: string;
  lineColor: string;
}) => {
  return (
    <div className={`grow flex-1`}>
      <Card title={title} color={lineColor}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 16,
              bottom: 30,
            }}
          >
            <XAxis
              dataKey={xKey}
              angle={-90}
              tick={{
                dx: -8,
                dy: 20,
                stroke: "#f1f5f9",
                fontWeight: 100,
                fontSize: 13,
              }}
            />
            <YAxis
              tick={{
                dx: -8,
                stroke: "#f1f5f9",
                fontWeight: 100,
                fontSize: 13,
              }}
            />
            <Tooltip contentStyle={{ color: "black" }} />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={lineColor}
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default LineChartWidget;
