"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "login" | "signup">(
    "email",
  );
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "email" && emailRef.current) {
      emailRef.current.focus();
    } else if (step === "code" && codeRef.current) {
      codeRef.current.focus();
    }
  }, [step]);

  const handleProceed = () => {
    console.log("Sending code to", email);
    setStep("code");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Card className="w-full max-w-sm p-10">
        <CardHeader>
          <CardTitle>
            <strong>Login to your account</strong>
          </CardTitle>
          <CardDescription>
            Enter your email to access your account. You will receive an access
            code via email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="Enter your email here"
                  className="w-full"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            variant="default"
            onClick={handleProceed}
            disabled={!email}
            className="w-full"
          >
            Prosseguir
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm">
        <a href="/terms" className="mr-2 text-blue-500">
          Termos de Uso
        </a>
        <span className="mx-2 text-gray-400">|</span>
        <a href="/privacy" className="text-blue-500">
          Política de Privacidade
        </a>
      </div>
    </div>
  );
}
