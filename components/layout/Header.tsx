import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import GitHub from "@mui/icons-material/GitHub";
import SvgIcon from "@mui/material/SvgIcon";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";
export function Header() {
  return (
    <Container>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        className="header"
      >
        <Box>
          <Image
            src="/xotp_128x128.png"
            width="48"
            height="48"
            alt="xotp logo"
            className="logo"
          />
          <Link href="/">
            <Typography
              component={"h1"}
              fontWeight={700}
              display={"inline-flex"}
            >
              XOTP
            </Typography>
          </Link>
        </Box>

        <Box>
          <a href="https://github.com/farshidbeheshti/xotp">
            <GitHub />
          </a>

          <a href="https://www.npmjs.com/package/xotp">
            <SvgIcon>
              <svg
                viewBox="0 0 2500 2500"
                xmlns="http://www.w3.org/2000/svg"
                width="2500"
                height="2500"
              >
                <path d="M0 0h2500v2500H0z" fill="#c00" />
                <path
                  d="M1241.5 268.5h-973v1962.9h972.9V763.5h495v1467.9h495V268.5z"
                  fill="#fff"
                />
              </svg>
            </SvgIcon>
          </a>
        </Box>
      </Grid>
    </Container>
  );
}
