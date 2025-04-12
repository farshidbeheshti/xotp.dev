import type { Metadata } from "next";
import "./globals.css";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { Header, Footer } from "@/components/layout/";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "XOTP",
  description:
    "Demo Application to Generate and Verify OTP tokens usign XOTP and display QR code for given options",
  keywords: ["node.js otp", "node.js two factor authentication", "node.js 2fa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content="XOTP" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="XOTP Demo Application" />
        <meta property="og:site_name" content="XOTP" />
        <meta
          property="og:description"
          content="Generate and Verify OTP codes usign XOTP and display QR code for given options"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://xotp.dev" />
        <meta
          property="og:image"
          content="https://xotp.dev/xotp_1200x1200.png"
        />
        <meta property="og:image:alt" content="XOTP" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
      </head>
      <body>
        <Grid container minHeight={"100%"} direction={"column"}>
          <Header />
          <Grid container flexGrow={1} alignItems={"center"} role="main">
            <Container>
              <main>{children}</main>
            </Container>
          </Grid>
          <Footer />
        </Grid>
        <GoogleAnalytics gaId="G-8W7L3479CL" />
        <Script id="gtm" strategy="afterInteractive">
          {`<!-- Google tag (gtag.js) -->window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-8W7L3479CL');`}
        </Script>
      </body>
    </html>
  );
}
