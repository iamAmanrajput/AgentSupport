import { Outfit } from "next/font/google";

import "@workspace/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={`${fontSans.variable} antialiased`}
    >
      <body>
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
