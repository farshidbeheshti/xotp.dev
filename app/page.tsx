"use client";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useOTPGenerator } from "@/hooks/useOTPGenerator";
import { useDebounce } from "@/hooks/useDebounce";
import { OTPControls } from "@/components/forms/OTPControls";
import { OTPDisplay } from "@/components/ui/OTPDisplay";
import { CodePanel } from "@/components/CodePanel";
import { DEFAULT_OTP_OPTIONS } from "@/constants/otp";
import { OTPOptions } from "@/types/otp";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Index() {
  const { otp, options, remaining, generateOTP, setOptions } =
    useOTPGenerator(DEFAULT_OTP_OPTIONS);

  const debouncedGenerate = useDebounce((newOptions: OTPOptions) => {
    generateOTP(newOptions);
  }, 300);

  const handleOptionsChange = (
    field: keyof OTPOptions,
    value: string | number
  ) => {
    const newOptions = { ...options, [field]: value };
    setOptions(newOptions);
    debouncedGenerate(newOptions);
  };

  return (
    <ErrorBoundary>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 200px)" }}>
        {/* Controls Panel */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Configuration
              </Typography>
              <OTPControls
                options={options}
                onOptionsChange={handleOptionsChange}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Result Panel */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Live Result
              </Typography>
              <OTPDisplay
                otp={otp}
                duration={options.duration}
                remaining={remaining}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Code Panel */}
        <Grid item xs={12} lg={4}>
          <CodePanel options={options} />
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
}
