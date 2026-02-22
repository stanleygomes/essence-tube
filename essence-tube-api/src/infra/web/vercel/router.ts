import { AuthRoutes } from "./routes/auth.route.js";
import { PlaylistRoutes } from "./routes/playlist.route.js";
import { SubscriptionRoutes } from "./routes/subscription.route.js";
import { VideoRoutes } from "./routes/video.route.js";

import {
  addVideoToPlaylistUseCase,
  getLatestVideosFromChannelUseCase,
  getPlaylistsUseCase,
  getSubscribedChannelsUseCase,
  getUrlConsentUseCase,
  getUrlRedirectBackUseCase,
  getVideosFromPlaylistUseCase,
  getVideoUseCase,
  removeVideoFromPlaylistUseCase,
} from "../../providers/dependencies.js";

const authRoutes = new AuthRoutes(
  getUrlConsentUseCase,
  getUrlRedirectBackUseCase
);

const playlistRoutes = new PlaylistRoutes(
  getVideosFromPlaylistUseCase,
  getPlaylistsUseCase,
  addVideoToPlaylistUseCase,
  removeVideoFromPlaylistUseCase
);

const videoRoutes = new VideoRoutes(getVideoUseCase);

const subscriptionRoutes = new SubscriptionRoutes(
  getSubscribedChannelsUseCase,
  getLatestVideosFromChannelUseCase
);

export {
  authRoutes,
  playlistRoutes,
  videoRoutes,
  subscriptionRoutes,
};
