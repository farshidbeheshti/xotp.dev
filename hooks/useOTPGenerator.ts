import { useState, useEffect, useCallback } from "react";
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
  const [needsReset, setNeedsReset] = useState(true);

  // Update remaining time immediately when duration changes
  useEffect(() => {
    const newRemaining =
      options.duration - (Math.floor(Date.now() / 1000) % options.duration);
    setRemaining(newRemaining);
  }, [options.duration]);

  const generateOTP = useCallback(async (newOptions: OTPOptions) => {
    try {
      const request = {
        ...newOptions,
        secret: newOptions.secret.toUpperCase(),
      };

      const newRemaining =
        newOptions.duration -
        (Math.floor(Date.now() / 1000) % newOptions.duration);
      setRemaining(newRemaining);
      setOptions(request);

      const result = await createTOTPToken(request);
      setOtp(result);
      setNeedsReset(false);
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (needsReset) {
        generateOTP(options);
      } else {
        const newRemaining =
          options.duration - (Math.floor(Date.now() / 1000) % options.duration);
        setRemaining(newRemaining);

        if (newRemaining === 1) {
          setNeedsReset(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [options, needsReset, generateOTP]);

  return {
    otp,
    options,
    remaining,
    generateOTP,
    setOptions,
  };
}
