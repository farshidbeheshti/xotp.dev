import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SecretIcon from "@mui/icons-material/Key";
import DigitsIcon from "@mui/icons-material/Pin";

import AccountIcon from "@mui/icons-material/Person";
import HashAlgoIcon from "@mui/icons-material/Https";
import DurationIcon from "@mui/icons-material/AccessTimeFilled";

const ICONS = {
  secret: <SecretIcon fontSize="small" />,
  digits: <DigitsIcon fontSize="small" />,
  duration: <DurationIcon fontSize="small" />,
  account: <AccountIcon fontSize="small" />,
  info: <InfoIcon fontSize="small" />,
  hashAlgo: <HashAlgoIcon fontSize="small" />,
} as const;

export function Tip({
  icon,
  text,
  top = 0,
}: {
  icon?: keyof typeof ICONS;
  text: string;
  top?: number;
}) {
  return (
    <Box display={"flex"} mt={top}>
      {icon && ICONS[icon]}
      <Typography variant="caption" color="#64748b" fontWeight={500} ml={0.2}>
        {text}
      </Typography>
    </Box>
  );
}
