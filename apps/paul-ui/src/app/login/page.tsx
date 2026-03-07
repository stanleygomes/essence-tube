"use client";

import React, { useState, useRef, useEffect } from "react";

export default function LoginPage() {
  console.log("LoginPage rendered");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "login" | "signup">("email");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "email" && emailRef.current) {
      emailRef.current.focus();
    }
  }, [step]);

  const handleProceed = () => {
    // Mock logic: if email contains '@gmail.com', assume has account, else signup
    if (email.includes("@gmail.com")) {
      setStep("login");
    } else {
      setStep("signup");
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

        {(step === "login" || step === "signup") && (
          <>
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
                Entrar
              </button>
            ) : (
              <button
                onClick={handleSignup}
                disabled={!password}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
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
