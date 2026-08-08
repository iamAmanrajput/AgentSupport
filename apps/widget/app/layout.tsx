import { Geist, Geist_Mono, Pacifico } from "next/font/google";

import "@workspace/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import StoreProvider from "@/components/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
    >
      <body>
        <StoreProvider>
          <ConvexClientProvider>
            <ThemeProvider>
              <div className="h-screen w-screen bg-secondary/20">
                {children}
              </div>
            </ThemeProvider>
          </ConvexClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
