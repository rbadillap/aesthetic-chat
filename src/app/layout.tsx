import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "aesthetic.chat | Neo-minimalist AI Chat",
  description: "A neo-minimalist AI chat experience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} font-sans text-base`}>
        <SidebarProvider defaultOpen={false}>
          <div className="grid grid-cols-[auto_1fr] h-screen w-screen">
            <AppSidebar />
            <main className="w-full h-full overflow-hidden">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

