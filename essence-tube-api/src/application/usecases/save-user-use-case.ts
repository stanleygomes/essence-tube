import { v4 as uuidv4 } from 'uuid';
import { AuthInfo } from '../../domain/entities/auth-info.entity.js';
import { User } from '../../domain/entities/user.entity.js';
import { AuthInfoToUserMapper } from '../../domain/mappers/entities.mapper.js';
import { UserRepository } from '../../domain/port/databases/user.repository.js';
import { UpdateUserUseCase } from './update-user-use-case.js';

export class SaveUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  async execute(userData: AuthInfo, tokenUUID: string): Promise<User> {
    const user = await this.userRepository.getUserByPartnerId(userData.partner_id);

    if (!user) {
      const uuid = uuidv4();
      return this.createUser(userData, tokenUUID, uuid);
    }

    user.partner_token = tokenUUID;
    return this.updateUserUseCase.execute(user);
  }

  private async createUser(userData: AuthInfo, tokenUUID: string, uuid: string): Promise<User> {
    const user = AuthInfoToUserMapper.toUser(userData, tokenUUID, uuid);
    user.created_at = new Date();
    user.updated_at = new Date();

    return this.userRepository.createUser(user);
  }
}
