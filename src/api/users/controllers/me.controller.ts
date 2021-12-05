/* eslint-disable @typescript-eslint/no-empty-function */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/api/auth/decorators/auth-user.decorator';
import { FirebaseGuard } from 'src/api/auth/guards/firebase.guard';
import { REGISTER_PROVIDER } from 'src/api/auth/types/register-providers.type';
import { Province } from 'src/api/locations/entities/province.entity';
import { Category } from 'src/api/projects/entities/category.entity';
import { CategoryValidationPipe } from 'src/api/projects/pipes/category.pipe';
import { ProvinceValidationPipe } from 'src/api/locations/pipes/province.pipe';
import { User } from '../entities/user.entity';
import { CreateClientProfileInterface } from '../interfaces/create-client-profile.interface';
import { CreateProProfileInterface } from '../interfaces/create-pro-profile.interface';
import { CreateClientProfileRequestDto } from '../requests/create-client-profile.request.dto';
import { CreateProProfileRequestDto } from '../requests/create-pro-profile.request.dto';
import { ClientProfileService } from '../services/client-profile.service';
import { ProProfileService } from '../services/pro-profile.service';
import { UsersService } from '../services/users.service';
import { USER_ROLE } from '../types/user-roles.type';
import { getUserImageFromFirebase } from '../utils/get-user-image-from-firebase.helper';

@UseGuards(FirebaseGuard)
@Controller('/me')
export class MeController {
  constructor(
    private readonly clientProfileService: ClientProfileService,
    private readonly proProfileService: ProProfileService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getMe(@AuthUser() authUser: User): User {
    // TODO: add response dto
    return authUser;
  }

  @Post('/client-profile')
  async setClientProfile(
    @AuthUser() authUser: User,
    @Body() dto: CreateClientProfileRequestDto,
  ): Promise<void> {
    // check if auth user already has role and his related profile, then throw error
    this.checkIsUserRoleExists(authUser);

    // set user role as client
    await this.usersService.setUserRole(authUser.id, USER_ROLE.CLIENT);

    const clientProfileData: CreateClientProfileInterface = {
      ...dto,
      user: authUser,
    };

    // get user image if he was register with google provider
    clientProfileData.image = await this.getUserImageFromProvider(authUser);

    await this.clientProfileService.createClientProfile(clientProfileData);
  }

  @Post('/pro-profile')
  async setProProfile(
    @AuthUser() authUser: User,
    @Body() dto: CreateProProfileRequestDto,
    @Body('provinces', ProvinceValidationPipe) provinces: Province[],
    @Body('categories', CategoryValidationPipe) categories: Category[],
  ): Promise<void> {
    // check if auth user already has role and his related profile, then throw error
    this.checkIsUserRoleExists(authUser);

    // set user role as pro
    await this.usersService.setUserRole(authUser.id, USER_ROLE.PRO);

    const proProfileData: CreateProProfileInterface = {
      ...dto,
      provinces,
      categories,
      user: authUser,
    };

    // get user image if he was register with google provider
    proProfileData.image = await this.getUserImageFromProvider(authUser);

    await this.proProfileService.createProProfile(proProfileData);
  }

  private checkIsUserRoleExists(user: User): void {
    if (user.role != null)
      throw new BadRequestException(
        'User already has the assigned role and created profile',
      );
  }

  private async getUserImageFromProvider(user: User): Promise<string> {
    if (user.auth.registerProvider === REGISTER_PROVIDER.GOOGLE)
      return getUserImageFromFirebase(user.auth.firebaseUid);
  }
}
