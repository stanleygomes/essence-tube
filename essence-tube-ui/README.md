# EssenceTube

Aplicativo React para listar vídeos de canais do YouTube. Sem algoritmos, sem distrações. Apenas o essencial.

---

## 📖 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tech Stack](#-tech-stack)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Começando](#-começando)
- [Uso](#-uso)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Release e Versionamento](#-release-e-versionamento)
- [Deploy](#-deploy)
- [Como Contribuir](#-como-contribuir)
- [Licença](#-licença)

---

## 🌟 Sobre o Projeto

O **EssenceTube** oferece uma experiência limpa e minimalista para consumir conteúdo do YouTube.  
Aqui, você vê apenas os vídeos dos canais que escolheu seguir, sem recomendações automáticas, distrações ou algoritmos.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Linguagem:** TypeScript
- **UI:** TailwindCSS
- **Gerenciamento de estado:** React Hooks
- **API:** Integração com YouTube Data API via backend próprio
- **Autenticação:** Google OAuth 2.0
- **Deploy:** Vercel

---

## 📁 Estrutura de Pastas

```
src/
├── app/           # Páginas Next.js (rotas)
│   ├── home/
│   ├── feed/
│   ├── login/
│   ├── settings/
│   ├── terms/
│   ├── privacy/
│   └── video/
├── modules/       # Componentes de página (por domínio)
├── shared/        # Componentes reutilizáveis, UI, utils
│   ├── components/
│   ├── services/
│   ├── ui/
│   └── utils/
├── services/      # Serviços de acesso à API, storage, etc
├── config/        # Configurações globais
├── models/        # Tipos e interfaces de dados
```

---

## 🛠️ Começando

### Pré-requisitos

- **Node.js**: v20.x ou superior
- **npm**: v10.x ou superior

### Instalação

1. Clone o repositório:
  ```bash
  git clone https://github.com/seu-usuario/essence-tube.git
  cd essence-tube
  ```

2. Instale as dependências:
  ```bash
  npm install
  ```

3. Configure as variáveis de ambiente:
  ```bash
  cp .env.template .env
  ```
  Edite o arquivo `.env` conforme necessário.

---

## ▶️ Uso

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o app.

---

## 🔧 Variáveis de Ambiente

As variáveis necessárias estão no arquivo `.env.template`.  
Exemplo:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🚢 Release e Versionamento

O versionamento segue [Semantic Versioning](https://semver.org/) e utiliza `standard-version` para gerar changelog, atualizar a versão no `package.json` e criar tags automaticamente com base nos commits.

Para criar uma nova versão:

```bash
npm run release
```

---

## 🚀 Deploy

O deploy é feito automaticamente na Vercel a cada push na branch principal.

---

## 🤝 Como Contribuir

Nosso fluxo de contribuição é baseado em Pull Requests diretamente neste repositório:

1.  **Crie uma Branch** para sua nova feature ou correção. Use um nome descritivo (em inglês) e siga um padrão, como `feature/minha-nova-feature` ou `fix/corrige-bug-x`:
  ```bash
  git checkout -b feature/minha-nova-feature
  ```
2.  **Desenvolva e Faça o Commit** de suas mudanças. Escreva mensagens de commit claras e significativas seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  ```bash
  git commit -m "feat: Adiciona nova funcionalidade de busca por tags"
  ```
3.  **Faça o Push** para a sua branch:
  ```bash
  git push origin feature/minha-nova-feature
  ```
4.  **Abra um Pull Request** neste repositório. O título do PR deve ser claro e a descrição deve explicar o que foi feito, por que foi feito e como pode ser testado. Se o PR resolve uma Issue existente, mencione-a na descrição (ex: `Resolves #42`).

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
