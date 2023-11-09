import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sudoku',
  description: 'Sudoku online maked by Nikita Kuzmenko',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
