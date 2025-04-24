"use client"

import type React from "react"
import { Line } from "recharts"
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from "recharts"

interface TooltipPayload {
  name: string
  value: number
  color?: string
}

interface ChartTooltipProps {
  payload?: TooltipPayload[]
  label?: string
  formatter?: (value: number) => string
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ payload, label, formatter }) => {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="p-2 bg-white border rounded shadow-md">
      <p className="font-bold">{label}</p>
      {payload.map((item, index) => (
        <p key={index} className="text-gray-700">
          {item.name}: {formatter ? formatter(item.value) : item.value}
        </p>
      ))}
    </div>
  )
}

interface ChartContainerProps {
  children: React.ReactNode
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <div className="w-full h-64">{children}</div>
}

interface LineChartProps {
  data: Array<Record<string, string | number>>
  categories: string[]
  index: string
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showGridLines?: boolean
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  showLegend,
  showGridLines,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        {showGridLines && <CartesianGrid stroke="#f5f5f5" />}
        <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps {
  data: Array<Record<string, string | number>>
  categories: string[]
  index: string
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showGridLines?: boolean
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  showLegend,
  showGridLines,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey={index} />
        <YAxis tickFormatter={valueFormatter} />
        {showGridLines && <CartesianGrid stroke="#f5f5f5" />}
        <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i % colors.length]} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}