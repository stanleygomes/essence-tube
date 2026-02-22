# EssenceTube API



API de suporte para o EssenceTube, um app para listar vídeos de canais do YouTube. Sem algoritmos, sem distrações. Apenas o essencial.

## 🌟 Sobre o Projeto

O **EssenceTube API** é o backend que serve o cliente EssenceTube, uma aplicação focada em fornecer uma experiência de consumo de conteúdo do YouTube pura e sem distrações.

### 🎯 Problema Resolvido

O YouTube moderno é construído em torno de algoritmos de recomendação que visam maximizar o tempo de tela, muitas vezes levando a um ciclo de consumo de conteúdo reativo e pouco intencional. O EssenceTube ataca esse problema removendo completamente o feed de recomendações, permitindo que os usuários foquem exclusivamente nos canais que escolheram seguir.

### 📊 Status do Projeto

O projeto está **em produção**.

### 🛠️ Tech Stack

  - **Runtime**: Node.js v20.x
  - **Framework**: Express.js (orquestrado via Vercel Functions)
  - **Linguagem**: TypeScript
  - **Banco de Dados**: MongoDB com Mongoose
  - **Autenticação**: Google OAuth 2.0
  - **Logging**: Pino com Pino-Pretty
  - **Deployment**: Vercel

-----

## 🏛️ Arquitetura

Este projeto foi construído seguindo os princípios da **Clean Architecture** para garantir um código desacoplado, testável, escalável e de fácil manutenção.

### ✨ Princípios da Clean Architecture

A arquitetura é dividida em camadas concêntricas, onde a regra principal é que as **dependências sempre apontam para dentro**. A camada mais interna (`domain`) não conhece nenhuma das camadas externas.

1.  **`domain`**: O coração da aplicação. Contém as entidades de negócio (ex: `User`, `Video`), as regras de negócio (Casos de Uso) e as interfaces (contratos) para o mundo externo (ex: `IVideoRepository`). É 100% independente de frameworks.
2.  **`application`**: Orquestra o fluxo de dados entre a camada de infraestrutura e o domínio. Contém os `Controllers` que recebem as requisições, validam os dados e chamam os Casos de Uso apropriados.
3.  **`infrastructure`**: A camada mais externa. Contém todos os detalhes técnicos: a configuração do servidor, a implementação do repositório com MongoDB/Mongoose, clientes para APIs externas (YouTube), o logger, etc. Esta camada implementa as interfaces definidas no `domain`.

Essa abordagem nos permite, por exemplo, trocar o MongoDB por outro banco de dados alterando apenas a camada de `infrastructure`, sem impactar a lógica de negócio.

### 📁 Estrutura de Pastas

```
/src
├── domain/
│   ├── entities/
│   ├── errors/
│   ├── repositories/
│   └── services/
│
├── application/
│   └── use-cases/
│
└── infrastructure/
    ├── config/
    ├── database/
    │   └── mongodb/
    │   └── redis/
    ├── logger/
    ├── services/
    │   └── google-account/
    │   └── google-auth/
    │   └── youtube/
    ├── web/
    │   └── vercel/
    │       └── middlewares/
    │   └── fastify/
    │       └── docs/
    │       └── routes/
    └── providers/           # Injeção de Dependência
```

-----

## 🚀 Começando

Siga estes passos para configurar e executar o projeto localmente.

### ✅ Pré-requisitos

  - **Node.js**: `v20.x` ou superior.
  - **pnpm**: `v9.8.x` ou superior.
  - **Vercel CLI**: `pnpm install -g vercel`
  - Um banco de dados MongoDB acessível (localmente ou na nuvem).

### 💻 Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/essense-tube-api.git
    cd essense-tube-api
    ```
2.  Instale as dependências:
    ```bash
    pnpm install
    ```
3.  Crie o arquivo de variáveis de ambiente. Você pode copiar o exemplo (se houver um `.env.example`):
    ```bash
    cp .env.example .env
    ```
4.  Preencha o arquivo `.env` com suas credenciais. Consulte a seção [Variáveis de Ambiente](https://www.google.com/search?q=%23-vari%C3%A1veis-de-ambiente) para mais detalhes.

-----

## ▶️ Uso

Para iniciar o servidor de desenvolvimento local (usando a Vercel CLI), execute:

```bash
pnpm start
```

O servidor estará disponível em `http://localhost:3000` (ou na porta definida pela Vercel).

-----
## 📑 Documentação da API (Swagger)

A API possui documentação interativa gerada automaticamente via **Swagger**.

Você pode acessar a documentação em tempo real no endpoint:

```
/docs
```

Todas as rotas documentadas exibem exemplos de requisição e resposta.

Para rotas protegidas, utilize o botão **Authorize** no topo da interface Swagger e informe seu token JWT no formato `Bearer <token>`.

O arquivo de configuração do Swagger está centralizado em `src/infra/web/fastify/docs.ts` e utiliza os dados do `package.json` para manter as informações da API sempre atualizadas.

-----

As seguintes variáveis são necessárias para a execução do projeto. Elas devem ser definidas em um arquivo `.env` na raiz do projeto.

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `MONGODB_URI` | String de conexão completa com o MongoDB. | `mongodb://jhon-the-baptist:ABC123@localhost:27017/` |
| `MONGODB_DATABASE`| Nome do banco de dados a ser utilizado. | `essence-tube` |
| `GOOGLE_OAUTH_CLIENT_ID` | Client ID obtido do Google Cloud Console. | `123123123123.apps.googleusercontent.com` |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Client Secret obtido do Google Cloud Console. | `GOCSPX-xxxxxxxx` |
| `GOOGLE_OAUTH_REDIRECT_URI` | URI de redirecionamento autorizada no Google. | `http://localhost:3000/api/oauth-redirect` |
| `APP_PUBLIC_BASE_URL` | URL base da aplicação que o usuário acessa. | `http://localhost:3000` |
| `APP_CORS_ORIGIN` | Domínio do cliente autorizado a fazer requisições. | `http://localhost:3001` |

-----

## 🚢 Deploy

O deploy é automatizado e acontece a cada push na branch `master` para a Vercel.

### Release e versionamento

O versionamento do projeto segue o [Semantic Versioning](https://semver.org/) e utiliza o pacote [`standard-version`](https://github.com/conventional-changelog/standard-version) para gerar changelog, atualizar a versão no `package.json` e criar tags automaticamente com base nos commits.

Para criar uma nova versão, gere changelog, commit e tag, execute:

```bash
pnpm run release
```

-----

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

-----

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE.md` para mais detalhes.

