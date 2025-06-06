'use client';

import Header from "@shared/components/header/Header";

export default function Privacy() {
  return (
    <>
      <Header
        title='Política de privacidade'
      />
      <div className="p-6 max-w-2xl mx-auto" style={{ paddingTop: 'calc(100px + env(safe-area-inset-top))' }}>
        <p className="mb-4">
          Esta aplicação utiliza a API do YouTube para fornecer funcionalidades
          personalizadas aos usuários. Coletamos apenas os dados fornecidos pela API
          do YouTube, necessários para oferecer a melhor experiência possível.
        </p>
        <p className="mb-4">
          Os dados acessados da sua conta do YouTube são utilizados exclusivamente
          para exibir informações relevantes e permitir que você altere informações
          da sua própria conta no YouTube, conforme sua solicitação.
        </p>
        <p className="mb-4">
          Não coletamos, armazenamos ou utilizamos quaisquer outros dados pessoais
          além daqueles fornecidos pela API do YouTube. Nenhum membro da nossa
          equipe terá acesso, irá consultar ou alterar dados dos usuários que
          fizerem login e compartilharem suas informações conosco.
        </p>
        <p>
          Se tiver dúvidas sobre esta política, entre em contato conosco.
        </p>
      </div>
    </>
  );
}
