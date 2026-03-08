"use client";

import React, { useState } from "react";
import FooterLinks from "../components/FooterLinks";
import EmailForm from "./EmailForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleProceed = () => {
    console.log("Sending code to", email);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <EmailForm
        email={email}
        setEmail={setEmail}
        handleProceed={handleProceed}
      />
      <FooterLinks />
    </div>
  );
}
