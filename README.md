# EssenceTube

Aplicativo para listar vídeos de canais do YouTube. Sem algoritmos, sem distrações. Apenas o essencial.

## 🌟 Sobre o Projeto

O **EssenceTube** oferece uma experiência limpa e minimalista para consumir conteúdo do YouTube. Aqui, você vê apenas os vídeos dos canais que escolheu seguir, sem recomendações automáticas, distrações ou algoritmos.

O **EssenceTube API** é o backend que serve o cliente EssenceTube, uma aplicação focada em fornecer uma experiência de consumo de conteúdo do YouTube pura e sem distrações.

### 🎯 Problema Resolvido

O YouTube moderno é construído em torno de algoritmos de recomendação que visam maximizar o tempo de tela, muitas vezes levando a um ciclo de consumo de conteúdo reativo e pouco intencional. O EssenceTube ataca esse problema removendo completamente o feed de recomendações, permitindo que os usuários foquem exclusivamente nos canais que escolheram seguir.

## 🛠️ Tech Stack

### Frontend (UI)

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Linguagem:** TypeScript
- **UI:** TailwindCSS
- **Gerenciamento de estado:** React Hooks
- **Autenticação:** Google OAuth 2.0
- **Deploy:** Vercel

### Backend (API)

- **Framework**: Express.js (orquestrado via Vercel Functions)
- **Linguagem**: TypeScript
- **Banco de Dados**: MongoDB com Mongoose
- **Autenticação**: Google OAuth 2.0
- **Logging**: Pino com Pino-Pretty
- **Deployment**: Vercel

### Monorepo

- **Ferramenta:** Turborepo
- **Gerenciamento de pacotes:** npm
- **Linting:** ESLint
- **Formatação:** Prettier
- **TypeScript:** Configurações compartilhadas
- **Runtime**: Node.js v20.x

## 🏛️ Arquitetura

O projeto segue os princípios da **Clean Architecture** para garantir um código desacoplado, testável, escalável e de fácil manutenção.

A arquitetura é dividida em camadas concêntricas, onde a regra principal é que as **dependências sempre apontam para dentro**. A camada mais interna (`domain`) não conhece nenhuma das camadas externas.

1. **`domain`**: O coração da aplicação. Contém as entidades de negócio (ex: `User`, `Video`), as regras de negócio (Casos de Uso) e as interfaces (contratos) para o mundo externo (ex: `IVideoRepository`). É 100% independente de frameworks.
2. **`application`**: Orquestra o fluxo de dados entre a camada de infraestrutura e o domínio. Contém os `Controllers` que recebem as requisições, validam os dados e chamam os Casos de Uso apropriados.
3. **`infrastructure`**: A camada mais externa. Contém todos os detalhes técnicos: a configuração do servidor, a implementação do repositório com MongoDB/Mongoose, clientes para APIs externas (YouTube), o logger, etc. Esta camada implementa as interfaces definidas no `domain`.

Essa abordagem nos permite, por exemplo, trocar o MongoDB por outro banco de dados alterando apenas a camada de `infrastructure`, sem impactar a lógica de negócio.

## 📁 Estrutura do Monorepo

Este Turborepo inclui os seguintes apps e packages:

### Apps

- `api`: API backend (Node.js/TypeScript)
- `ui`: Interface do usuário (Next.js)

### Packages

- `@repo/eslint-config`: Configurações ESLint
- `@repo/typescript-config`: Configurações TypeScript

Cada app/package é 100% [TypeScript](https://www.typescriptlang.org/).

### Utilitários

- [TypeScript](https://www.typescriptlang.org/) para checagem de tipos
- [ESLint](https://eslint.org/) para linting
- [Prettier](https://prettier.io) para formatação

## 🚀 Começando

### Pré-requisitos

- Node.js v18.x
- npm

### Instalação

```sh
npm install
```

### Desenvolvimento

Para subir todos os apps e packages:

```sh
npm run dev
```

Para subir um app específico:

```sh
npx turbo dev --filter=<app-name>
```

### Build

Para build de todos os apps:

```sh
npm run build
```

Para build de um app específico:

```sh
npx turbo build --filter=<app-name>
```

### Lint

```sh
npm run lint
```

### Checagem de Tipos

```sh
npm run check-types
```

## 📖 Uso

### API

A API fornece endpoints para autenticação, playlists, vídeos e subscriptions.

Para rodar a API localmente:

```sh
cd apps/api
npm run dev
```

Ou via Docker:

```sh
npm run docker
```

### UI

A interface permite login via Google OAuth, visualização de feed, gerenciamento de subscriptions, etc.

Para rodar a UI:

```sh
cd apps/ui
npm run dev
```

## 🔧 Variáveis de Ambiente

Consulte os arquivos `.env.example` em cada app para as variáveis necessárias.

## 📦 Deploy

- **API**: Vercel Functions
- **UI**: Vercel
- **Docs/Web**: Vercel

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 🔗 Links Úteis

- [Turborepo Docs](https://turborepo.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel](https://vercel.com)

Made with 🔥 by NazarethLabs
