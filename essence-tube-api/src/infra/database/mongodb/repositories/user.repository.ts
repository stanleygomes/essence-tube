import { MongoRepository } from '../repository.js';
import { BusinessError } from '../../../../domain/errors/BusinessError.js';
import type { User } from '../../../../domain/entities/user.entity.js';
import { UserMapper } from '../mappers/user.mapper.js';
import { Logger } from '../../../logger/pino.logger.js'
import type { UserRepository } from '../../../../domain/port/databases/user.repository.js';
import { UserDocument, UserModel } from '../schemas/user.schema.js';

export class UserMongoDBRepository implements UserRepository {
  private userRepository = new MongoRepository(UserModel);
  private logger = Logger.getLogger()

  async getUserByUUID(uuid: string): Promise<User | null> {
    try {
      const doc = await this.userRepository.findOne({ uuid })

      return doc ? UserMapper.toEntity(doc) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error retrieving user by uuid from database');
    }
  }

  async getUserByPartnerId(partnerId: string): Promise<User | null> {
    try {
      const doc = await this.userRepository.findOne({ partner_id: partnerId });

      return doc ? UserMapper.toEntity(doc) : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error retrieving user by partner_id from database');
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      let doc = UserMapper.toDocument(user);

      if ('_id' in doc) {
        delete (doc as any)._id;
      }

      await this.userRepository.create(doc as Omit<Partial<UserDocument>, '_id'>);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error creating user to database');
    }
  }

  async updateUserByUUID(user: User, uuid: string): Promise<User> {
    try {
      const doc = UserMapper.toDocument(user);
      await this.userRepository.update({ uuid }, doc);
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessError('Error updating user to database');
    }
  }
}
