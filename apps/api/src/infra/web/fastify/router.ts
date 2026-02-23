import { FastifyInstance } from "fastify";
import { AuthRoutes } from "./routes/auth.route.js";
import {
  addVideoToPlaylistUseCase,
  getPlaylistsUseCase,
  getUrlConsentUseCase,
  getUrlRedirectBackUseCase,
  getVideosFromPlaylistUseCase,
  removeVideoFromPlaylistUseCase,
  getSubscribedChannelsUseCase,
  getLatestVideosFromChannelUseCase,
  getVideoUseCase,
} from "../../providers/dependencies.js";
import { PlaylistRoutes } from "./routes/playlist.route.js";
import { SubscriptionRoutes } from "./routes/subscription.route.js";
import { VideoRoutes } from "./routes/video.route.js";
import { loginWithGoogleSchema, oauthCallbackSchema } from "./docs/auth.doc.js";
import {
  listPlaylistsSchema,
  listVideosFromPlaylistSchema,
  addVideoToPlaylistSchema,
  removeVideoFromPlaylistSchema,
} from "./docs/playlist.doc.js";
import {
  listSubscriptionsSchema,
  listLatestVideosFromChannelSchema,
} from "./docs/subscription.doc.js";
import { getVideoSchema } from "./docs/video.doc.js";

export class AppRouter {
  private authRoutes: AuthRoutes;
  private playlistRoutes: PlaylistRoutes;
  private subscriptionRoutes: SubscriptionRoutes;
  private videoRoutes: VideoRoutes;

  constructor() {
    this.authRoutes = new AuthRoutes(
      getUrlConsentUseCase,
      getUrlRedirectBackUseCase,
    );

    this.playlistRoutes = new PlaylistRoutes(
      getVideosFromPlaylistUseCase,
      getPlaylistsUseCase,
      addVideoToPlaylistUseCase,
      removeVideoFromPlaylistUseCase,
    );

    this.subscriptionRoutes = new SubscriptionRoutes(
      getSubscribedChannelsUseCase,
      getLatestVideosFromChannelUseCase,
    );

    this.videoRoutes = new VideoRoutes(getVideoUseCase);
  }

  public register(fastify: FastifyInstance, prefix = "") {
    // Auth routes
    fastify.get(
      `${prefix}/login`,
      {
        schema: loginWithGoogleSchema,
      },
      this.authRoutes.getUrlConsentHandler,
    );

    fastify.get(
      `${prefix}/oauthcode`,
      {
        schema: oauthCallbackSchema,
      },
      this.authRoutes.getUrlRedirectBackHandler,
    );

    // Playlist routes
    fastify.get(
      `${prefix}/playlists`,
      {
        schema: listPlaylistsSchema,
      },
      this.playlistRoutes.getPlaylistsHandler,
    );

    fastify.get(
      `${prefix}/playlists/:id`,
      {
        schema: listVideosFromPlaylistSchema,
      },
      this.playlistRoutes.getVideosFromPlaylistHandler,
    );

    fastify.post(
      `${prefix}/playlists/video`,
      {
        schema: addVideoToPlaylistSchema,
      },
      this.playlistRoutes.addPlaylistVideoHandler,
    );

    fastify.delete(
      `${prefix}/playlists/video`,
      {
        schema: removeVideoFromPlaylistSchema,
      },
      this.playlistRoutes.removePlaylistVideoHandler,
    );

    // Subscription routes
    fastify.get(
      `${prefix}/subscriptions`,
      {
        schema: listSubscriptionsSchema,
      },
      this.subscriptionRoutes.getChannelsHandler,
    );

    fastify.get(
      `${prefix}/subscriptions/:id/videos`,
      {
        schema: listLatestVideosFromChannelSchema,
      },
      this.subscriptionRoutes.getLatestVideosFromChannelHandler,
    );

    // Video routes
    fastify.get(
      `${prefix}/videos/:id`,
      {
        schema: getVideoSchema,
      },
      this.videoRoutes.getVideoHandler,
    );
  }
}
