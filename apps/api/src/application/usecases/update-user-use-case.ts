import { User } from '../../domain/entities/user.entity.js';
import { UserRepository } from '../../domain/port/databases/user.repository.js';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User>  {
    user.updated_at = new Date();
    return this.userRepository.updateUserByUUID(user, user.uuid);
  }
}
