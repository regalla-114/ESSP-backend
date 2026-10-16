import { UserModel } from '../models/user.model.js';
import { ProfileModel } from '../models/profile.model.js';
import { ApiError } from '../utils/apiError.js';

export class UserService {
  static async getAllUsers() {
    return await UserModel.findAllWithProfiles();
  }

  static async getUserById(id: string) {
    const user = await UserModel.findByIdWithProfile(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }

  static async updateProfile(
    userId: string,
    data: {
      firstName?: string;
      lastName?: string;
      department?: string;
      designation?: string;
      phoneNumber?: string;
      avatarUrl?: string;
    }
  ) {
    const { firstName, lastName, ...profileData } = data;

    if (firstName || lastName) {
      await UserModel.update(userId, {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
      });
    }

    if (Object.keys(profileData).length > 0) {
      await ProfileModel.updateByUserId(userId, profileData);
    }

    return this.getUserById(userId);
  }
}
