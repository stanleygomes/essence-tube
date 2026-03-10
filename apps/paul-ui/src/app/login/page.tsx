"use client";

import React from "react";
import FooterLinks from "../components/FooterLinks";
import EmailForm from "./EmailForm";
import Features from "./Features";
import Testimonials from "./Testimonials";
import HeroImage from "./HeroImage";
import Faq from "./Faq";

export default function LoginPage() {
  const handleProceed = (data: { email: string }) => {
    console.log("Sending code to", data.email);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row py-16 lg:py-[150px] bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] z-0">
        <div className="flex-1 flex items-center justify-center p-6">
          <EmailForm onSubmit={handleProceed} />
        </div>
        <HeroImage />
      </div>
      <Features />
      <Testimonials />
      <Faq />
      <div className="flex justify-center p-6">
        <FooterLinks />
      </div>
    </div>
  );
}
