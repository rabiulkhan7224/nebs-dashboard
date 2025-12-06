import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { FcGoogle } from "react-icons/fc";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps extends React.ComponentProps<"div"> {
  onSubmit: () => void;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isSubmitting?: boolean;
}

export function LoginForm({
  className,
  onSubmit,
  register,
  errors,
  isSubmitting,
  ...props
}: LoginFormProps) {


  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center gap-1">
            <Image src="/Logo.png" height={20} width={20} alt="logo" />
            <h1 className="text-xl">Nebs IT</h1>
          </div>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Log in to your wellness journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <FieldGroup className="space-y-2">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  className="h-10"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Button
            type="button"
            variant="link"
            className="text-sm p-0 h-auto"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot password?
          </Button>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </Field>

              <Field>
                <Button
                variant={'secondary'}
                  className="w-full text-black  text-xl border hover:bg-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/sign-up" className="underline">
                    Sign up
                  </a>
                </FieldDescription>

                <hr className="my-4" />
                <div className="text-center text-sm text-gray-600">Or</div>

                {/* <Button variant="outline" className="w-full text-md mt-3" type="button">
                  <FcGoogle className="size-6 mr-2" />
                  Continue with Google
                </Button> */}
              </Field>
            </FieldGroup>
          </form>

         
        </CardContent>
      </Card>
       {/* <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      /> */}
    </div>
  );
}