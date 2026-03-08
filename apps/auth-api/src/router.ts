import { FastifyInstance } from "fastify";
// import { AuthRoutes } from "./infra/web/fastify/routes/auth.route.js";
// import {
//   addVideoToPlaylistUseCase,
//   getPlaylistsUseCase,
//   getUrlConsentUseCase,
//   getUrlRedirectBackUseCase,
//   getVideosFromPlaylistUseCase,
//   removeVideoFromPlaylistUseCase,
//   getSubscribedChannelsUseCase,
//   getLatestVideosFromChannelUseCase,
//   getVideoUseCase,
// } from "../../providers/dependencies.js";
// import { PlaylistRoutes } from "./infra/web/fastify/routes/playlist.route.js";
// import { SubscriptionRoutes } from "./infra/web/fastify/routes/subscription.route.js";
// import { VideoRoutes } from "./infra/web/fastify/routes/video.route.js";
// import {
//   loginWithGoogleSchema,
//   oauthCallbackSchema,
// } from "./controllers/docs/auth.doc.js";
// import {
//   listPlaylistsSchema,
//   listVideosFromPlaylistSchema,
//   addVideoToPlaylistSchema,
//   removeVideoFromPlaylistSchema,
// } from "./controllers/docs/playlist.doc.js";
// import {
//   listSubscriptionsSchema,
//   listLatestVideosFromChannelSchema,
// } from "./controllers/docs/subscription.doc.js";
// import { getVideoSchema } from "./controllers/docs/video.doc.js";

export class AppRouter {
  // private authRoutes: AuthRoutes;
  // private playlistRoutes: PlaylistRoutes;
  // private subscriptionRoutes: SubscriptionRoutes;
  // private videoRoutes: VideoRoutes;

  constructor() {
    // this.authRoutes = new AuthRoutes(
    //   getUrlConsentUseCase,
    //   getUrlRedirectBackUseCase,
    // );
    // this.playlistRoutes = new PlaylistRoutes(
    //   getVideosFromPlaylistUseCase,
    //   getPlaylistsUseCase,
    //   addVideoToPlaylistUseCase,
    //   removeVideoFromPlaylistUseCase,
    // );
    // this.subscriptionRoutes = new SubscriptionRoutes(
    //   getSubscribedChannelsUseCase,
    //   getLatestVideosFromChannelUseCase,
    // );
    // this.videoRoutes = new VideoRoutes(getVideoUseCase);
  }

  public register(fastify: FastifyInstance, prefix = "") {
    console.log("Registering routes...: ", { prefix });
    // fastify.get(
    //   `${prefix}/login`,
    //   {
    //     schema: loginWithGoogleSchema,
    //   },
    //   this.authRoutes.getUrlConsentHandler,
    // );
    // fastify.get(
    //   `${prefix}/oauthcode`,
    //   {
    //     schema: oauthCallbackSchema,
    //   },
    //   this.authRoutes.getUrlRedirectBackHandler,
    // );
  }
}
