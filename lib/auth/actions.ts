"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "./axios-instance";
import { setAuthCookies } from "./cookies";
import { LoginData, SignupData } from "./types";

// Helper: common response handler
async function handleAuthSuccess(res: any) {

  if (res.data.success) {
    console.log(res.data)
    const { accessToken, refreshToken, role } = res.data.data || {};
    // normalize role to 'user'|'admin' for the convenience cookie
    const roleCookie = role === "USER" ? "user" : role === "ADMIN" ? "admin" : undefined;
    await setAuthCookies(accessToken, refreshToken, roleCookie);
  }
  
  return res.data;
}

// SignUp
export async function signupAction(data: SignupData) {
    console.log("dataCheck", data)   
    const { firstName, lastName, email, password } = data;

  const res = await api.post("/auth/signup", {
    firstName,
    lastName,
    email,
    password,
  });
  
  return res.data;
  
}


// 2. Resend Signup OTP
export async function resendSignupOtpAction(email: string) {
  const res = await api.post("/auth/resend-signup-otp", { email });
  return res.data;
}

// 3. Verify Signup OTP
export async function verifySignupOtpAction({ email, otp }: { email: string; otp: number }) {
  const res = await api.post("/auth/verify-otp", { email, otp });
//   const result = handleAuthSuccess(res);
//   if (result.success) redirect("/dashboard");
  return res.data;
}

// 4. Login 
export async function loginAction(data: LoginData) {
   
  const res = await api.post("/auth/login", data);
  
  // const result = await handleAuthSuccess(res);
  // console.log('Return result',result)
  // Return result to client; client should perform navigation.
  return res;
}

// 6. Refresh Token
export async function refreshTokenAction() {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
  if (!refreshToken) throw new Error("No refresh token found");

  const res = await api.post("/auth/refresh-token", { refreshToken });
  // const result = handleAuthSuccess(res);
  // return result;
  return res.data;
}

// // 7. Logout
// export async function logoutAction() {
//   clearAuthCookies();
//   redirect("/login");
// }

// 8. Forgot Password
export async function forgotPasswordAction(email: string) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

// 9. Resend Forgot Password OTP
export async function resendForgotOtpAction(email: string) {
  const res = await api.post("/auth/resend-forgot-otp", { email });
  return res.data;
}

// 10. Verify Forgot Password OTP
export async function verifyForgotOtpAction({ email, otp }: { email: string; otp: string }) {
  const res = await api.post("/auth/verify-forgot-otp", { email, otp });
  return res.data; 
}

// 11. Change Password
export async function changePasswordAction(resetToken: string, newPassword: string) {
  const res = await api.post("/auth/change-password", {
    resetToken,
    newPassword,
  });
  // const result = handleAuthSuccess(res);
  // if (result.success) redirect("/dashboard");
  // return result;
  return res.data;
}

 // 12. Get Current User
export async function getCurrentUserAction() {
  const accessToken = (await cookies()).get("access_token")?.value;

  // If there's no access token in cookies, redirect to login
  if (!accessToken) {
    redirect("/login");
  }

  const res = await api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If the API responds unauthorized or indicates failure, redirect to login
  if (res?.status === 401 || res?.data?.success === false) {
    redirect("/login");
  }

  return res.data;
}