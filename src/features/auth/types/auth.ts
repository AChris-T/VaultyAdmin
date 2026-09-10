export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  lastLoginAt: string;
  mustChangePassword: boolean;
};

// Returned by POST /admin/auth/login (202) — nobody is signed in yet.
export type LoginChallenge = {
  challengeToken: string;
  expiresAt: string;
  otpSentTo: string;
  message: string;
};

// Returned by POST /admin/auth/login/verify (200) — the actual sign-in.
export type VerifyLoginResponse = {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  adminSessionId: string;
  admin: AuthUser;
};
