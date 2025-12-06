
export type AuthResponse =
  | { success: true; accessToken: string; refreshToken: string }
  | { success: false; message: string }
  | { success: true ; message: string } ;

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  
}

export interface LoginData {
  email: string;
  password: string;
}

export interface OTPData {
  email: string;
  otp: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}