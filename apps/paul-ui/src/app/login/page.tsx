"use client";

import React, { useState, useRef, useEffect } from "react";

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
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleProceed}
              disabled={!email}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Prosseguir
            </button>
          </>
        )}

        {step === "code" && (
          <>
            <div>
              <label htmlFor="code" className="block text-sm font-medium mb-1">
                Código de Verificação
              </label>
              <input
                ref={codeRef}
                id="code"
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Digite o código de 6 dígitos"
                maxLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
              />
              <p className="text-sm text-gray-600 mt-1">
                Enviamos um código para {email}
              </p>
            </div>
            <button
              onClick={handleVerifyCode}
              disabled={code.length !== 6}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {email.includes("@gmail.com")
                ? "Continuar para Login"
                : "Continuar para Criar Conta"}
            </button>
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
            <div>
              <label
                htmlFor="email-display"
                className="block text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                id="email-display"
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {step === "login" ? (
              <button
                onClick={handleLogin}
                disabled={!password}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Fazer Login
              </button>
            ) : (
              <button
                onClick={handleSignup}
                disabled={!password}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Criar Conta
              </button>
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
          <a href="/privacy" className="text-blue-500">
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
}
