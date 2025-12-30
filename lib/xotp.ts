"use server";
import * as xotp from "xotp";
import { OTPOptions, OTPResult } from "@/types/otp";

export async function createTOTPToken(options: OTPOptions): Promise<OTPResult> {
  const totp = new xotp.TOTP(options);

  // Validate Base32 format before passing to library to prevent regex errors
  if (options?.secret && !/^[A-Z2-7]+=*$/.test(options.secret)) {
    console.error("Invalid Base32 secret provided:", options.secret);
    throw new Error("Invalid Base32 secret");
  }

  const secret = options?.secret
    ? xotp.Secret.from(options.secret, "base32")
    : new xotp.Secret();

  return {
    token: totp.generate({ secret }),
    remaining: totp.timeRemaining(),
    generatedAt: Date.now(),
    keyUri: totp.keyUri({
      secret,
      account: options?.account || "nestjs-xotp",
    }),
  };
}
