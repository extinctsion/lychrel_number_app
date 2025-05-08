import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lychrel Number Visualizer",
  description: "Check and visualize Lychrel numbers",
    generator: 'extinctsion'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/letter-l.png" type="image/png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
