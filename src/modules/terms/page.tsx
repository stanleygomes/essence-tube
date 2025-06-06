'use client';

import Header from "@shared/components/header/Header";

export default function Terms() {
  return (
    <>
      <Header
        title='Termos de Serviço'
        showBackButton={true}
      />
      <div className="p-6 max-w-2xl mx-auto safe-page-content">
        <p className="mb-4">
          Ao utilizar esta aplicação, você concorda com os termos descritos abaixo.
          Esta aplicação utiliza a API do YouTube para fornecer funcionalidades
          personalizadas e depende dos dados fornecidos por essa API.
        </p>
        <p className="mb-4">
          Você autoriza o acesso aos dados da sua conta do YouTube apenas para fins
          de exibição e alteração de informações relacionadas à sua própria conta,
          conforme solicitado por você. Não utilizamos seus dados para outros fins.
        </p>
        <p className="mb-4">
          Não nos responsabilizamos por alterações feitas em sua conta do YouTube
          por meio desta aplicação, pois todas as ações são realizadas mediante sua
          autorização e solicitação.
        </p>
        <p className="mb-4">
          Nenhum membro da nossa equipe terá acesso, irá consultar ou alterar dados
          dos usuários que fizerem login e compartilharem suas informações conosco.
        </p>
        <p>
          Reservamo-nos o direito de atualizar estes termos a qualquer momento.
          Recomendamos que você revise esta página periodicamente.
        </p>
      </div>
    </>
  );
}
