import {
  TextField,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { OTPOptions, Algorithm } from "@/types/otp";
import { OptionSlider } from "@/components/OptionSlider";
import { AlgorithmSelector } from "@/components/ui/AlgorithmSelector";
import {
  DURATION_LIMITS,
  DIGITS_LIMITS,
  DEFAULT_OTP_OPTIONS,
} from "@/constants/otp";
import { generateSecret } from "@/lib/xotp";

interface OTPControlsProps {
  options: OTPOptions;
  onOptionsChange: (field: keyof OTPOptions, value: string | number) => void;
}

export function OTPControls({ options, onOptionsChange }: OTPControlsProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: "block" }}
        >
          Duration
        </Typography>
        <OptionSlider
          name="duration"
          aria-label="Duration"
          onChangeHandler={(e) => onOptionsChange("duration", e.value)}
          step={1}
          min={DURATION_LIMITS.min}
          max={DURATION_LIMITS.max}
          defaultValue={DEFAULT_OTP_OPTIONS.duration}
          valueLabelDisplay="on"
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, opacity: 0.8 }}
        >
          Token validity period (30s is standard)
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: "block" }}
        >
          Digits
        </Typography>
        <OptionSlider
          name="digits"
          aria-label="Digits"
          max={DIGITS_LIMITS.max}
          min={DIGITS_LIMITS.min}
          marks
          step={1}
          valueLabelDisplay="on"
          onChangeHandler={(e) => onOptionsChange("digits", e.value)}
          defaultValue={DEFAULT_OTP_OPTIONS.digits}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, opacity: 0.8 }}
        >
          OTP length (6 digits recommended)
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <AlgorithmSelector
          value={options.algorithm as Algorithm}
          onChange={(value) => onOptionsChange("algorithm", value)}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, opacity: 0.8, display: "block" }}
        >
          HMAC algorithm (sha1 for Google Authenticator)
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="text"
          label="Secret"
          value={options.secret}
          onChange={(e) => {
            // Optional: Force uppercase input for better UX as Base32 is case-insensitive but usually represented in upper case
            const val = e.target.value.toUpperCase();
            onOptionsChange("secret", val);
          }}
          fullWidth
          size="small"
          error={!!options.secret && !/^[A-Z2-7]+=*$/.test(options.secret)}
          helperText={
            !!options.secret && !/^[A-Z2-7]+=*$/.test(options.secret)
              ? "Invalid Base32 characters (A-Z, 2-7 only)"
              : "Base32 encoded secret key (auto-generated if empty)"
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={async () => {
                    const newSecret = await generateSecret();
                    onOptionsChange("secret", newSecret);
                  }}
                  edge="end"
                  title="Generate Random Secret"
                >
                  <Refresh />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="text"
              label="Account"
              value={options.account}
              onChange={(e) => onOptionsChange("account", e.target.value)}
              size="small"
              fullWidth
              helperText="User identifier"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              label="Issuer"
              value={options.issuer}
              onChange={(e) => onOptionsChange("issuer", e.target.value)}
              size="small"
              fullWidth
              helperText="Service name"
            />
          </Grid>
        </Grid>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, opacity: 0.8, display: "block" }}
        >
          Display labels for authenticator apps
        </Typography>
      </Grid>
    </Grid>
  );
}
