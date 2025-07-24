import { GetUrlConsentUseCase } from '../../application/usecases/get-url-consent-use-case.js';
import { GetUrlRedirectBackUseCase } from '../../application/usecases/get-url-redirect-back.js';
import { GenerateAuthTokenUseCase } from '../../application/usecases/generate-auth-token.js';
import { TokenRedisRepository } from '../database/redis/repositories/token.repository.js';
import { CreateTokenUseCase } from '../../application/usecases/create-token.js';
import { GetVideosFromPlaylistUseCase } from '../../application/usecases/get-videos-from-playlist.js';
import { GetPartnerBearerTokenUseCase } from '../../application/usecases/get-bearer-token.js';
import { SaveRefreshTokenUseCase } from '../../application/usecases/save-refresh-token.js';
import { YoutubeService } from '../services/youtube/youtube.service.js';
import { GoogleAuthService } from '../services/google-auth/google-auth.service.js';
import { GetPlaylistsUseCase } from '../../application/usecases/get-playlists.js';
import { GetVideoUseCase } from '../../application/usecases/get-video-use-case.js';
import { GetSubscribedChannelsUseCase } from '../../application/usecases/get-subscribed-channels.js';
import { GetLatestVideosFromChannelUseCase } from '../../application/usecases/get-latest-videos-from-channel.js';
import { AddVideoToPlaylistUseCase } from '../../application/usecases/add-video-to-playlist.js';
import { RemoveVideoFromPlaylistUseCase } from '../../application/usecases/remove-video-from-playlist.js';
import { GoogleAccountService } from '../services/google-account/google-account.service.js';
import { SaveUserUseCase } from '../../application/usecases/save-user-use-case.js';
import { UserMongoDBRepository } from '../database/mongodb/repositories/user.repository.js';
import { JwtService } from '../auth/jwt.js';
import { UpdateUserUseCase } from '../../application/usecases/update-user-use-case.js';
import { connectMongoose } from '../database/mongodb/connection.js';
import { connectRedis } from "../database/redis/connection.js";

try {
  await connectMongoose();
} catch (err) {
  console.error('Erro ao conectar ao MongoDB:', err);
  throw err;
}

try {
  await connectRedis();
} catch (err) {
  console.error('Erro ao conectar ao Redis:', err);
  throw err;
}

/* repositories */
const tokenRedisDBRepository = new TokenRedisRepository();
const userMongoDBRepository = new UserMongoDBRepository();

/* services */
const googleAuthService = new GoogleAuthService();
const youtubeService = new YoutubeService();
const googleAccountService = new GoogleAccountService()
const authService = new JwtService();

/* use cases */
const updateUserUseCase = new UpdateUserUseCase(
  userMongoDBRepository,
);
const saveUserUseCase = new SaveUserUseCase(
  userMongoDBRepository,
  updateUserUseCase
);
const saveRefreshTokenUseCase = new SaveRefreshTokenUseCase(
  googleAuthService,
  tokenRedisDBRepository,
);
const getPartnerBearerTokenUseCase = new GetPartnerBearerTokenUseCase(
  saveRefreshTokenUseCase,
  tokenRedisDBRepository,
  authService,
  userMongoDBRepository,
);
const createToken = new CreateTokenUseCase(
  tokenRedisDBRepository,
);
const generateAuthToken = new GenerateAuthTokenUseCase(
  googleAuthService,
  createToken,
);
const getUrlConsentUseCase = new GetUrlConsentUseCase(googleAuthService);
const getUrlRedirectBackUseCase = new GetUrlRedirectBackUseCase(
  generateAuthToken,
  googleAccountService,
  saveUserUseCase,
  authService,
);
const getVideosFromPlaylistUseCase = new GetVideosFromPlaylistUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);
const getPlaylistsUseCase = new GetPlaylistsUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);
const getVideoUseCase = new GetVideoUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);
const getSubscribedChannelsUseCase = new GetSubscribedChannelsUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);
const getLatestVideosFromChannelUseCase = new GetLatestVideosFromChannelUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);
const addVideoToPlaylistUseCase = new AddVideoToPlaylistUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);
const removeVideoFromPlaylistUseCase = new RemoveVideoFromPlaylistUseCase(
  getPartnerBearerTokenUseCase,
  youtubeService,
);

export {
  getUrlConsentUseCase,
  getUrlRedirectBackUseCase,
  getVideosFromPlaylistUseCase,
  getPlaylistsUseCase,
  getVideoUseCase,
  getSubscribedChannelsUseCase,
  getLatestVideosFromChannelUseCase,
  addVideoToPlaylistUseCase,
  removeVideoFromPlaylistUseCase,
};
