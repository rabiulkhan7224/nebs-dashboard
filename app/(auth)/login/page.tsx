"use client";

import { LoginForm } from "@/components/login-form";
import { loginAction } from "@/lib/auth/actions";
import { loginSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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

    const res = await loginAction(data);
    console.log("Login response:", res);
    if (res?.success) {
      // set token
       localStorage.setItem("token",res.data.accessToken)  

      // prefer role from response; fallback to 'user'
      const respRole = res.data?.role || res.data?.data?.role;
      const role = respRole === 'USER' || respRole === 'user' ? 'user' : respRole === 'ADMIN' || respRole === 'admin' ? 'admin' : 'user';
      const destination = role === 'admin' ? '/dashboard/admin/user-management' : '/dashboard/user/ai-chatbot';
      toast.success('Login successful!');
      router.replace(destination);
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