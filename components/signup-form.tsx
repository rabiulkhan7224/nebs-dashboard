"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { signupSchema, type SignupInput } from "@/lib/validation/auth"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { signupAction } from "@/lib/auth/actions"
import SignupVerifyModal from "./auth/SignupVerifyModal"
import axios from "axios"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
 const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: SignupInput) => {
    // remove confirmPassword from data
    
    const { confirmPassword, ...signupData } = data;

    try {
    
    // await signupAction(data);
    // const res= axios.post("https://3c66de9e03a0.ngrok-free.app/api/v1/auth/signup", signupData);
      const res = await signupAction(signupData);
      console.log("Signup successful:", res);
      setEmail(data.email);
      setIsOpen(true);
      toast.success("Account created successfully!")
      // reset()
    } catch (err:any) {
      console.error("Signup failed:", err);
      toast.error( `${err.message}` || "Signup failed. Please try again." );
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a new account</CardTitle>
        <CardDescription>
          For first time you don’t have any account please create a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <div className="flex items-center space-x-2">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </Field>

            <Field>
  <FieldLabel>Password</FieldLabel>
  <div className="relative">
    <Input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      {...register("password")}
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      tabIndex={-1}
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
  {errors.password && (
    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
  )}
</Field>

<Field>
  <FieldLabel>Confirm Password</FieldLabel>
  <div className="relative">
    <Input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm your password"
      {...register("confirmPassword")}
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      tabIndex={-1}
    >
      {showConfirmPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  </div>
  {errors.confirmPassword && (
    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
  )}
</Field>


            <FieldGroup>
              <Field>
                <Button
                  className="bg-[linear-gradient(273deg,#DFBE0A_-17.65%,#F9E684_93.58%)] text-black"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login" >Login</Link>
                </FieldDescription>

                <hr className="my-4" />
                <p className="text-center">Or</p>

                <Button variant="outline" className="text-md w-full" type="button">
                  <FcGoogle className="size-6 mr-2" />
                  Sign up with Google
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
      <SignupVerifyModal isOpen={isOpen} onClose={setIsOpen} email={email} />
    </Card>
  )
}
