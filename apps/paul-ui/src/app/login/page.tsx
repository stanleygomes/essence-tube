"use client";

import React from "react";
import Image from "next/image";
import FooterLinks from "../components/FooterLinks";
import EmailForm from "./EmailForm";

export default function LoginPage() {
  const handleProceed = (data: { email: string }) => {
    console.log("Sending code to", data.email);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-6">
          <EmailForm onSubmit={handleProceed} />
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <Image
            src="/img/paul-writting.jpg"
            alt="Paul writing"
            width={500}
            height={500}
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-center p-6">
        <FooterLinks />
      </div>
    </div>
  );
}
