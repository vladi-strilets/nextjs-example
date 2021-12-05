import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/api/auth/decorators/auth-user.decorator';
import { Roles } from 'src/api/auth/decorators/roles.decorator';
import { FirebaseGuard } from 'src/api/auth/guards/firebase.guard';
import { RolesGuard } from 'src/api/auth/guards/roles.guard';
import {
  serialize,
  SerializedResponse,
} from 'src/api/shared/helpers/serialize';
import { ProProfile } from '../entities/pro-profile.entity';

import { User } from '../entities/user.entity';
import { ProProfileResponseDto } from '../responses/pro-profile.response.dto';
import { ProProfileService } from '../services/pro-profile.service';
import { USER_ROLE } from '../types/user-roles.type';

@ApiTags('Users - Pro-profile')
@Roles(USER_ROLE.PRO)
@UseGuards(RolesGuard)
@UseGuards(FirebaseGuard)
@Controller('/me/pro-profile')
export class ProProfileController {
  constructor(public proProfileService: ProProfileService) {}

  @ApiResponse({
    type: ProProfileResponseDto,
  })
  @Get('/')
  getProProfile(
    @AuthUser() authUser: User,
  ): SerializedResponse<ProProfile, ProProfileResponseDto> {
    return serialize(authUser.proProfile, ProProfileResponseDto);
  }
}
