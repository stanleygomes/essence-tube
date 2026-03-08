import React from "react";

export default function FooterLinks() {
  return (
    <div className="text-center text-sm">
      <a href="/terms" className="mr-2 text-blue-500">
        Termos de Uso
      </a>
      <span className="mx-2 text-gray-400">|</span>
      <a href="/privacy" className="text-blue-500">
        Política de Privacidade
      </a>
    </div>
  );
}
