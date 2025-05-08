import { ThemeProvider } from "@/components/theme-provider"
import LychrelChecker from "@/components/lychrel-checker"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-background text-foreground relative">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-4xl space-y-8 mt-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Lychrel Number Checker</h1>
          <p className="text-center text-muted-foreground">
            Check if a number is a Lychrel number and visualize the results from 1 to n.
          </p>
          <LychrelChecker />
        </div>
      </main>
    </ThemeProvider>
  )
}
