"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { RefreshCw, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { verifySignupOtpAction } from "@/lib/auth/actions";
import axios from "axios";

interface SignupVerifyModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  email: string;
}

const SignupVerifyModal = ({
  isOpen,
  onClose,
  email,
}: SignupVerifyModalProps) => {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [resendComedown, setResendComedown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendComedown > 0) {
      timer = setInterval(() => {
        setResendComedown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendComedown]);
  const handleResendVerification = async () => {
    // if (!user?.email) return

    setIsResending(true);
    try {
      // TODO: Implement resend verification API call
     
      toast.success("Verification email sent! Please check your inbox.");
      setResendComedown(60); // 60 second comedown
    } catch (error: any) {
      toast.error(error.message || "Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleOTPComplete = async (otp: string) => {
    // Handle OTP completion logic here
 
    const data = {
      email: email,
      otp: otp,
      type: "SIGNUP"
    };

    console.log("OTP entered:", data);
    // You can add your verification logic here, like calling an API to verify the OTP
    try {
    //    const res = await verifySignupOtpAction(data);
    const res =await axios.post("http://206.162.244.135:6001/api/v1/auth/verify-otp", data);
      console.log('otp ', res)
      toast.success("Email verified successfully!");
      onClose(false);

      // Redirect to login page
      router.push("/login");
    } catch (error: any) {
      toast.error(`${error.message || "OTP verification failed"}`);
    }

    // After verification, you can close the modal or redirect the user
  };

  return (
    <div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-w-md space-y-4 p-4 w-full
            "
        >
          <DialogHeader className="flex flex-col items-center space-y-4">
            <Shield className="h-8 w-8 text-green-500 " />
            <DialogTitle className="text-center">
             Verify Your OTP
            </DialogTitle>
            <DialogDescription className="text-center">
              Please enter the code below to verify your email address.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              onComplete={(value) => handleOTPComplete(value)}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="space-x-4 *:rounded-lg! *:border!">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              onClick={handleResendVerification}
              disabled={isResending || resendComedown > 0}
              variant="outline"
              className=""
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : resendComedown > 0 ? (
                `Resend in ${resendComedown}s`
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignupVerifyModal;
