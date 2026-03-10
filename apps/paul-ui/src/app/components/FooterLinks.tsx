import React from "react";

export default function FooterLinks() {
  return (
    <div className="w-full py-6 border-t-4">
      <div className="flex justify-between items-center text-sm px-6">
        <div>
          <a href="/terms" className="mr-2">
            Termos de Uso
          </a>
          <span className="mx-2 text-gray-400">|</span>
          <a href="/privacy" className="ml-2">
            Política de Privacidade
          </a>
        </div>
        <div className="text-right">made with 🔥 by NazarethLabs</div>
      </div>
    </div>
  );
}
