import ImageByTheme from "@shared/ui/image-by-theme/ImageByTheme";
import { config } from '@config/config'
import Button from "@shared/ui/button/Button";
import Card from "@shared/ui/card/Card";
import Icon from "@shared/ui/icon/Icon";

const IconNoAlgo = (
  <Icon name="window-close" className="text-red-500 mb-2 text-3xl" />
);
const IconChannels = (
  <Icon name="users-crown" className="text-blue-500 mb-2 text-3xl" />
);
const IconFeed = (
  <Icon name="bars-solid" className="text-green-500 mb-2 text-3xl" />
);
const IconLock = <Icon name="lock" className="text-gray-500 mb-2 text-3xl" />;

export default function Login() {
  const { baseUrl } = config.api;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <div
        className="flex flex-col items-center justify-center pt-12 pb-6 bg-[#e6d6b8] dark:bg-[#3a2c1a] w-full"
        style={{ marginTop: "-60px" }}
      >
        <ImageByTheme
          srcDark="/img/logo-dark.png"
          srcLight="/img/logo-light.png"
          width={100}
          height={100}
          classNameLight="mb-6 block dark:hidden"
          classNameDark="mb-6 hidden dark:block"
        />
        <h1
          className={`mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-center font-pixelify`}
        >
          EssenceTube
        </h1>
        <p className="mb-2 text-center text-gray-700 dark:text-gray-200 text-base max-w-sm">
          The essential YouTube, without distractions.
        </p>
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold text-center mb-2">Why use it?</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {IconNoAlgo}
            <div>
              <div className="font-semibold">No algorithms</div>
              <div className="text-xs">
                You choose what to watch, no automatic suggestions.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {IconChannels}
            <div>
              <div className="font-semibold">Your channels, your videos</div>
              <div className="text-xs">
                See all the channels you are subscribed to and their videos
                easily.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {IconFeed}
            <div>
              <div className="font-semibold">Personalized feed</div>
              <div className="text-xs">
                Build your feed only with videos you want to watch.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {IconLock}
            <div>
              <div className="font-semibold">Privacy and control</div>
              <div className="text-xs">
                Platform protected by login. Only you can see your data.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
          How does it work?
        </h2>
        <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 list-disc list-inside">
          <li>Log in with your Google account</li>
          <li>See all your channels and videos</li>
          <li>Add videos to your personalized feed</li>
          <li>Watch without distractions, only what you choose</li>
        </ul>
      </Card>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center max-w-xs mx-auto pb-2">
        Your experience is private and secure. Only you have access to your
        feed.
      </div>

      <div
        className="flex justify-center max-w-md mx-auto px-6 py-3 my-3 gap-4 text-xs text-gray-500 dark:text-gray-400 pb-6"
        style={{ borderTop: "2px solid #c2b8a3" }}
      >
        <a href="/terms" className="hover:underline">
          Terms of Service
        </a>
        <span>|</span>
        <a href="/privacy" className="hover:underline">
          Privacy
        </a>
      </div>

      <div
        className="fixed bottom-0 left-0 w-full z-50"
        style={{
          background: "var(--background)",
          boxShadow: "0 -2px 8px 0 rgba(0,0,0,0.04)",
          borderTop: "2px solid #c2b8a3",
        }}
      >
        <div className="flex justify-end items-center py-6 max-w-md mx-auto">
          <a href={`${baseUrl}/login`}>
            <Button
              type="button"
              color="red"
              className="w-full py-2 text-base mb-0"
              icon="arrow-right"
              iconPosition="right"
            >
              Sign in with Google
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
