import { Secret, TOTP, type Algorithm } from "xotp";
import { OTPOptions, OTPResult } from "@/types/otp";

export async function generateSecret(): Promise<string> {
  const secret = new Secret();
  return secret.toString("base32");
}

export async function createTOTPToken(options: OTPOptions): Promise<OTPResult> {
  // Validate Base32 format before passing to library to prevent decode errors
  if (options?.secret && !/^[A-Z2-7]+=*$/.test(options.secret)) {
    console.error("Invalid Base32 secret provided:", options.secret);
    throw new Error("Invalid Base32 secret");
  }

  const secret = options?.secret
    ? Secret.from(options.secret, "base32")
    : new Secret();

  const totp = new TOTP({
    algorithm: options.algorithm as Algorithm,
    digits: options.digits,
    duration: options.duration,
    window: options.window,
    issuer: options.issuer,
    account: options.account,
  });

  return {
    token: await totp.generate({ secret }),
    remaining: totp.timeRemaining(),
    generatedAt: Date.now(),
    keyUri: totp.toKeyUri({
      secret,
      account: options?.account || "demo",
    }),
  };
}
