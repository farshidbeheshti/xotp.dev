import type { Metadata } from "next";
import "./globals.css";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { Header, Footer } from "@/components/layout/";

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
      </body>
    </html>
  );
}
