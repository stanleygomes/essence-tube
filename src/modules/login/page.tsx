import ImageByTheme from "@shared/ui/image-by-theme/ImageByTheme";
import { config } from '@config/config'
import Button from "@shared/ui/button/Button";
import Card from "@shared/ui/card/Card";
import Icon from "@shared/ui/icon/Icon";
import Typography from "@shared/ui/typography/Typography";

const IconNoAlgo = (
  <Icon name="window-close" className="text-red-500 mb-2 text-3xl" />
);
const IconChannels = (
  <Icon name="users-crown" className="text-blue-500 mb-2 text-3xl" />
);
const IconFeed = (
  <Icon name="tech-stories" className="text-green-500 mb-2 text-3xl" />
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
        <Typography
          variant="h1"
          className="mb-2 text-3xl font-bold tracking-tight text-center"
        >
          EssenceTube
        </Typography>
        <Typography
          variant="p"
          className="mb-2 text-center text-gray-700 dark:text-gray-200 text-base max-w-sm"
        >
          The essential YouTube, without distractions.
        </Typography>
      </div>

      <div className="mx-6">
        <Card className="mt-6 max-w-md mx-auto">
          <Typography
            variant="h2"
            className="text-lg font-semibold text-center mb-2"
          >
            Why use it?
          </Typography>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {IconNoAlgo}
              <div>
                <Typography variant="h4" className="font-semibold">
                  No algorithms
                </Typography>
                <Typography variant="p" className="text-xs">
                  You choose what to watch, no automatic suggestions.
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {IconChannels}
              <div>
                <Typography variant="h4" className="font-semibold">
                  Your channels, your videos
                </Typography>
                <Typography variant="p" className="text-xs">
                  See all the channels you are subscribed to and their videos
                  easily.
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {IconFeed}
              <div>
                <Typography variant="h4" className="font-semibold">
                  Personalized feed
                </Typography>
                <Typography variant="p" className="text-xs">
                  Build your feed only with videos you want to watch.
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {IconLock}
              <div>
                <Typography variant="h4" className="font-semibold">
                  Privacy and control
                </Typography>
                <Typography variant="p" className="text-xs">
                  Platform protected by login. Only you can see your data.
                </Typography>
              </div>
            </div>
          </div>
        </Card>

        <Card className="max-w-md mx-auto">
          <Typography
            variant="h2"
            className="text-lg font-semibold mb-2 text-center"
          >
            How does it work?
          </Typography>
          <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2 list-disc list-inside">
            <li>
              <Typography variant="span">
                Log in with your Google account
              </Typography>
            </li>
            <li>
              <Typography variant="span">
                See all your channels and videos
              </Typography>
            </li>
            <li>
              <Typography variant="span">
                Add videos to your personalized feed
              </Typography>
            </li>
            <li>
              <Typography variant="span">
                Watch without distractions, only what you choose
              </Typography>
            </li>
          </ul>
        </Card>
      </div>

      <Typography
        variant="p"
        className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center max-w-xs mx-auto pb-2"
      >
        Your experience is private and secure.
        <br />
        Only you have access to your feed.
      </Typography>

      <div
        className="flex justify-center max-w-md mx-auto px-6 py-3 my-3 gap-4 text-xs text-gray-500 dark:text-gray-400 pb-6"
        style={{ borderTop: "2px solid #c2b8a3" }}
      >
        <a href="/terms" className="hover:underline">
          <Typography variant="span">Terms of Service</Typography>
        </a>
        <Typography variant="span">|</Typography>
        <a href="/privacy" className="hover:underline">
          <Typography variant="span">Privacy</Typography>
        </a>
      </div>

      <div
        className="fixed bottom-0 bg-theme left-0 w-full z-50"
        style={{
          borderTop: "2px solid #c2b8a3",
        }}
      >
        <div className="mx-6">
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
    </div>
  );
}
