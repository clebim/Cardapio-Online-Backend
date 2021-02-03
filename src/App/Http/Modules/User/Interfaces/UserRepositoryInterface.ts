import UserData from './UserDataInterface';
import User from '../../../Entities/User';

export default interface UserRepositoryInterface {
  findOneByEmail(email: string): Promise<User | undefined>;
  createUser(data: UserData): Promise<User>;
}
