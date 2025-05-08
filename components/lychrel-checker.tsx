"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import LychrelChart from "@/components/lychrel-chart"
import { checkLychrelNumbers } from "@/lib/lychrel"

export default function LychrelChecker() {
  const [inputNumber, setInputNumber] = useState<string>("")
  const [maxIterations, setMaxIterations] = useState<string>("100")
  const [results, setResults] = useState<{
    lychrelNumbers: number[]
    nonLychrelNumbers: number[]
    iterationsData: { number: number; iterations: number }[]
  } | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const n = Number.parseInt(inputNumber)
    const iterations = Number.parseInt(maxIterations)

    if (isNaN(n) || n <= 0) {
      setError("Please enter a valid positive number")
      return
    }

    if (isNaN(iterations) || iterations <= 0) {
      setError("Please enter a valid number of iterations")
      return
    }

    setLoading(true)

    // Use setTimeout to allow the UI to update before starting the calculation
    setTimeout(async () => {
      try {
        const result = await checkLychrelNumbers(n, iterations)
        setResults(result)
      } catch (err) {
        setError("An error occurred during calculation")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Check Lychrel numbers from 1 to:</Label>
                <Input
                  id="number"
                  type="number"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="Enter a number"
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iterations">Maximum iterations:</Label>
                <Input
                  id="iterations"
                  type="number"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(e.target.value)}
                  placeholder="Max iterations"
                  min="1"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Calculating..." : "Check Lychrel Numbers"}
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ) : results ? (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Suspected Lychrel Numbers:</h3>
                    <p className="text-muted-foreground">
                      {results.lychrelNumbers.length > 0 ? results.lychrelNumbers.join(", ") : "None found"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Total Numbers Checked:</h3>
                    <p className="text-muted-foreground">
                      {results.lychrelNumbers.length + results.nonLychrelNumbers.length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <LychrelChart data={results.iterationsData} />
        </div>
      ) : null}
    </div>
  )
}
