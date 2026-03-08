"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
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
    // Mock: send code to email
    console.log("Sending code to", email);
    setStep("code");
  };

  const handleVerifyCode = () => {
    // Mock verification
    if (code.length === 6) {
      // Mock logic: if email contains '@gmail.com', assume has account, else signup
      if (email.includes("@gmail.com")) {
        setStep("login");
      } else {
        setStep("signup");
      }
    }
  };

  const handleLogin = () => {
    // Mock login logic
    console.log("Login with", email, password);
  };

  const handleSignup = () => {
    // Mock signup logic
    console.log("Signup with", email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {step === "email" && (
          <>
            <Input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full"
            />
            <Button
              variant="default"
              onClick={handleProceed}
              disabled={!email}
              className="w-full"
            >
              Prosseguir
            </Button>
          </>
        )}

        {step === "code" && (
          <>
            <div>
              <Input
                ref={codeRef}
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Digite o código de 6 dígitos"
                maxLength={6}
                className="w-full text-center text-lg tracking-widest"
              />
              <p className="text-sm text-gray-600 mt-1">
                Enviamos um código para {email}
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleVerifyCode}
              disabled={code.length !== 6}
              className="w-full"
            >
              {email.includes("@gmail.com")
                ? "Continuar para Login"
                : "Continuar para Criar Conta"}
            </Button>
            <p className="text-center text-sm">
              <button
                onClick={() => setStep("email")}
                className="text-blue-500 hover:underline"
              >
                Este não é meu email
              </button>
            </p>
          </>
        )}

        {(step === "login" || step === "signup") && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold">
                {step === "login" ? "Fazer Login" : "Criar Nova Conta"}
              </h2>
              <p className="text-sm text-gray-600">
                {step === "login"
                  ? "Digite sua senha para acessar sua conta"
                  : "Crie uma senha para sua nova conta"}
              </p>
            </div>
            <Input
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-100"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full"
            />
            {step === "login" ? (
              <Button
                variant="default"
                onClick={handleLogin}
                disabled={!password}
                className="w-full"
              >
                Fazer Login
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSignup}
                disabled={!password}
                className="w-full"
              >
                Criar Conta
              </Button>
            )}
            {step === "login" && (
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 block text-center"
              >
                Esqueceu a senha?
              </a>
            )}
          </>
        )}

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
    </div>
  );
}
