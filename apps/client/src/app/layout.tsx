import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./provider";
import { TopAdBar, TopUpBar } from "@/components/core/Navbar";

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
  // const path = usePathname()
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopUpBar />
          <TopAdBar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}