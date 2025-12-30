import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
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
  const [showToast, setShowToast] = useState(false);

  const handleCopyKeyUri = async () => {
    await copyToClipboard(otp.keyUri);
    setShowToast(true);
  };

  return (
    <Stack alignItems="center" width="100%">
      <RemainingTime duration={duration} remaining={remaining} />

      <Box textAlign="center" marginY={2}>
        <Typography variant="h2" component="span">
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
                <IconButton onClick={handleCopyKeyUri} edge="end">
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>

      <Snackbar
        open={showToast}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowToast(false)}
        >
          Key URI copied to clipboard!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
