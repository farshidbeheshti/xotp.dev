"use server";
import * as xotp from "xotp";

export async function createTOTPToken(
  options = {
    algorithm: string,
    duration: number,
    digits: number,
    window: number,
    issuer: string,
    account: string,
    secret: string,
  }
) {
  const totp = new xotp.TOTP(options);

  const secret = options?.secret
    ? xotp.Secret.from(options.secret, "base32")
    : new xotp.Secret();

  return {
    token: totp.generate({
      secret,
    }),
    remaining: totp.timeRemaining(),
    generatedAt: Date.now(),
    keyUri: totp.keyUri({
      secret,
      account: options?.account || "nestjs-xotp",
    }),
  };
}
