"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

interface LychrelChartProps {
  data: { number: number; iterations: number }[]
}

export default function LychrelChart({ data }: LychrelChartProps) {
  // Prepare data for the chart
  const chartData = data.map((item) => ({
    number: item.number,
    iterations: item.iterations === -1 ? null : item.iterations,
  }))

  // Find max iterations for y-axis domain
  const maxIterations = Math.max(...data.filter((item) => item.iterations !== -1).map((item) => item.iterations))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lychrel Number Visualization</CardTitle>
        <CardDescription>
          Scatter plot showing the number of iterations needed to reach a palindrome. Suspected Lychrel numbers are
          shown at the top.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            iterations: {
              label: "Iterations",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="number"
                name="Number"
                label={{ value: "Number", position: "insideBottomRight", offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="iterations"
                name="Iterations"
                label={{ value: "Iterations", angle: -90, position: "insideLeft" }}
                domain={[0, maxIterations + 5]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Scatter name="Iterations to Palindrome" data={chartData} fill="var(--color-iterations)" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
