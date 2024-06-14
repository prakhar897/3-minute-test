import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3 Minute Test",
  description: "3 Minute Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link
					rel="icon"
					href="https://www.softwaredesign.ing/favicon.png"
				/>
				<link
					rel="apple-touch-icon"
					href="https://www.softwaredesign.ing/favicon.png"
				/>

				
				<link
					rel="icon"
					href="https://www.softwaredesign.ing/favicon.png"
					type="image/x-icon"
				/>
        <Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-2D06FZ0QYE"
				/>

				<Script id="google-analytics">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "G-2D06FZ0QYE");
        `}
		</Script>
        
            
        </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
