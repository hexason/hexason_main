import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./provider";
import Navbar from "@/components/core/Navbar";
import { ColorModeScript } from "@chakra-ui/react";

export const metadata = {
  title: 'Home',
  description: 'Welcome to Hexason',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}