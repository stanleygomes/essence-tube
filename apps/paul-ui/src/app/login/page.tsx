"use client";

import React from "react";
import FooterLinks from "../components/FooterLinks";
import EmailForm from "./EmailForm";

export default function LoginPage() {
  const handleProceed = (data: { email: string }) => {
    console.log("Sending code to", data.email);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <EmailForm onSubmit={handleProceed} />
      <FooterLinks />
    </div>
  );
}
