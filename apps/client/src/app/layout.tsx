import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./provider";

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
    <html lang="en" suppressHydrationWarning={true} >
      <body>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}