import { Inter } from "next/font/google";
import ImageByTheme from "@shared/ui/image-by-theme/ImageByTheme";
import { config } from '@config/config'

const IconNoAlgo = (
  <svg className="w-8 h-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
  </svg>
);
const IconChannels = (
  <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4.13V7a4 4 0 10-8 0v3m8 0a4 4 0 01-8 0" />
  </svg>
);
const IconFeed = (
  <svg className="w-8 h-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect width="20" height="14" x="2" y="5" rx="3" strokeWidth={2} stroke="currentColor" fill="none"/>
    <path stroke="currentColor" strokeWidth={2} d="M8 11h8M8 15h4" />
  </svg>
);
const IconLock = (
  <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect width="16" height="10" x="4" y="11" rx="2" strokeWidth={2} stroke="currentColor" fill="none"/>
    <path stroke="currentColor" strokeWidth={2} d="M8 11V7a4 4 0 118 0v4" />
  </svg>
);

const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export default function Login() {
  const { baseUrl } = config.api;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black px-4">
      {/* Header/logo */}
      <div className="flex flex-col items-center justify-center pt-12 pb-6">
        <ImageByTheme
          srcDark="/img/logo-dark.png"
          srcLight="/img/logo-light.png"
          width={100}
          height={100}
          classNameLight="mb-6 block dark:hidden"
          classNameDark="mb-6 hidden dark:block"
        />
        <h1
          className={`mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-center ${inter.className}`}
        >
          EssenceTube
        </h1>
        <p className="mb-2 text-center text-gray-700 dark:text-gray-200 text-base max-w-sm">
          O essencial do YouTube, sem distrações.
        </p>
      </div>

      {/* Bloco: Sobre o app */}
      <div className="block-about-app bg-gray-50 dark:bg-neutral-900 rounded-xl p-5 mb-6 max-w-md mx-auto shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">Por que usar?</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {IconNoAlgo}
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">Sem algoritmos</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Você escolhe o que assistir, sem sugestões automáticas.</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {IconChannels}
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">Seus canais, seus vídeos</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Veja todos os canais que você está inscrito e seus vídeos facilmente.</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {IconFeed}
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">Feed personalizado</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Monte seu feed só com vídeos que você quer assistir.</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {IconLock}
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">Privacidade e controle</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Plataforma protegida por login. Só você vê seus dados.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloco: Como funciona */}
      <div className="block-how-works bg-white dark:bg-neutral-800 rounded-xl p-5 mb-6 max-w-md mx-auto shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">Como funciona?</h2>
        <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 list-disc list-inside">
          <li>Faça login com sua conta Google</li>
          <li>Veja todos os seus canais e vídeos</li>
          <li>Adicione vídeos ao seu feed personalizado</li>
          <li>Assista sem distrações, só o que você escolheu</li>
        </ul>
      </div>

      {/* Botão de login */}
      <div className="block-login flex flex-col items-center mb-8 max-w-md mx-auto w-full">
        <a
          href={`${baseUrl}/login`}
          className="w-full"
        >
          <button
            type="button"
            className="w-full py-3 bg-red-600 text-white rounded-lg shadow-lg font-semibold text-lg hover:bg-red-700 transition mb-2"
          >
            Entrar com Google
          </button>
        </a>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center max-w-xs">
          Sua experiência é privada e segura. Só você tem acesso ao seu feed.
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 pb-6">
        <a href="/terms" className="hover:underline">
          Termos de serviço
        </a>
        <span>|</span>
        <a href="/privacy" className="hover:underline">
          Privacidade
        </a>
      </div>
    </div>
  );
}
