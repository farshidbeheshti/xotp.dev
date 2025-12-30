import { useState, useEffect, useCallback, useRef } from "react";
import { OTPOptions, OTPResult } from "@/types/otp";
import { createTOTPToken } from "@/lib/xotp";

export function useOTPGenerator(initialOptions: OTPOptions) {
  const [otp, setOtp] = useState<OTPResult>({
    token: "",
    keyUri: "",
    remaining: 0,
    generatedAt: 0,
  });
  const [options, setOptions] = useState<OTPOptions>(initialOptions);
  const [remaining, setRemaining] = useState(0);

  // Track the last processed epoch to prevent duplicate generations
  // Initialize with -1 to force an initial generation
  const lastEpochRef = useRef<number>(-1);

  const generateOTP = useCallback(async (newOptions: OTPOptions) => {
    try {
      const request = {
        ...newOptions,
        secret: newOptions.secret.toUpperCase(),
      };

      setOptions(request);

      const result = await createTOTPToken(request);
      setOtp(result);
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  }, []);

  useEffect(() => {
    // Function to calculate state
    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      const duration = options.duration || 30;

      const currentEpoch = Math.floor(now / duration);
      const newRemaining = duration - (now % duration);
      setRemaining(newRemaining);

      // If we are in a new epoch compared to last run, regenerate
      // This handles tab sleep/wake correctly because it checks the absolute time window
      if (currentEpoch > lastEpochRef.current) {
        lastEpochRef.current = currentEpoch;
        generateOTP(options);
      }
    };

    tick();

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [options, generateOTP]);

  useEffect(() => {
    lastEpochRef.current = -1;
  }, [
    options.duration,
    options.secret,
    options.algorithm,
    options.digits,
    options.account,
    options.issuer,
  ]);

  return {
    otp,
    options,
    remaining,
    generateOTP,
    setOptions,
  };
}
