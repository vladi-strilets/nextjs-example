import { Injectable } from '@nestjs/common';
import { Auth } from 'src/api/auth/entities/auth.entity';
import { User } from '../entities/user.entity';
import { D_CreateUserRequestDto } from '../requests/create-user.request.dto';
import { PRO_ROLE } from '../types/pro-roles.type';
import { USER_ROLE } from '../types/user-roles.type';
import { ClientProfileService } from './client-profile.service';
import { ProProfileService } from './pro-profile.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly clientProfileService: ClientProfileService,
    private readonly proProfileService: ProProfileService,
  ) {}

  async d_createUser(dto: D_CreateUserRequestDto): Promise<void> {
    const user = User.create({
      email: dto.email,
      role: dto.role,
    });

    await user.save();

    // create auth
    const auth = Auth.create({
      firebaseUid: dto.firebaseUid,
      user,
    });

    await auth.save();

    // create profiles based on role
    if (dto.role === USER_ROLE.CLIENT) {
      await this.clientProfileService.createClientProfile({
        displayName: 'Random client name',
        user,
      });
    } else {
      await this.proProfileService.createProProfile({
        proRole: PRO_ROLE.INDIVIDUAL,
        displayName: 'Random client name',
        user,
      });
    }

    // create config
    // TODO:
  }

  async setUserRole(userId: string, role: USER_ROLE): Promise<void> {
    await User.update(userId, {
      role,
    });
  }
}
