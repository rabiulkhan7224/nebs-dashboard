"use client";

import { LoginForm } from "@/components/login-form";
import { setAuthCookies } from "@/lib/auth/cookies";

import { loginSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


type LoginFormData = z.infer<typeof loginSchema>;



export default function LoginPage() {
 const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data);
try {

  const res = await axios.post("https://nebs-backend.vercel.app/v1/api/auth/login", data)
    console.log("Login response:", res);
    if (res.data.success) {                               
      // set token
       localStorage.setItem("token",res?.data?.data?.accessToken)  
        await  setAuthCookies(res?.data?.data?.accessToken)
        toast.success("Login successful")
        router.push("/dashboard")
      
    } else {
      toast.error('Login failed.');
    }
    
} catch (error: any) {  
    console.error("Login error:", error);
    setError("root", {
      type: "manual",
      message: error.message || "Login failed. Please try again.",
    });
    toast.error("Login failed. Please check your credentials.");
}
  };





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      
    </div>
  );
}