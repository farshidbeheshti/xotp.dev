import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";
import { RemainingTime } from "@/components/RemainingTime";
import { OTPResult } from "@/types/otp";
import { copyToClipboard } from "@/lib/clipboard";

interface OTPDisplayProps {
  otp: OTPResult;
  duration: number;
  remaining: number;
}

export function OTPDisplay({ otp, duration, remaining }: OTPDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyKeyUri = async () => {
    await copyToClipboard(otp.keyUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <Stack alignItems="center" width="100%">
      <RemainingTime duration={duration} remaining={remaining} />

      <Box textAlign="center" marginY={2}>
        <Typography
          variant="h2"
          component="span"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Current OTP token: ${otp.token.split("").join(" ")}`} // Spaced out for even clearer reading
        >
          {otp.token}
        </Typography>
      </Box>

      <Box
        sx={{
          padding: 2,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          margin: 2,
        }}
      >
        <QRCodeSVG
          value={otp.keyUri}
          size={180}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
          includeMargin={true}
        />
      </Box>

      <Tooltip title={otp.keyUri} arrow placement="top">
        <TextField
          fullWidth
          margin="normal"
          type="text"
          label="Key URI"
          value={otp.keyUri}
          slotProps={{ htmlInput: { readOnly: true } }}
          focused
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleCopyKeyUri}
                  edge="end"
                  aria-label={copied ? "Copied" : "Copy Key URI to clipboard"}
                >
                  {copied ? <Check color="success" /> : <ContentCopy />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
    </Stack>
  );
}
