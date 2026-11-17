export interface OTPOptions {
  algorithm: string;
  secret: string;
  duration: number;
  digits: number;
  window: number;
  issuer: string;
  account: string;
}

export interface OTPResult {
  token: string;
  keyUri: string;
  remaining: number;
  generatedAt: number;
}

/** Algorithms supported by Web Crypto HMAC (xotp v2). */
export type Algorithm = "sha1" | "sha256" | "sha384" | "sha512";
