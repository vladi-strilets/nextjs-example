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
import { ClientProfile } from '../entities/client-profile.entity';
import { User } from '../entities/user.entity';
import { ClientProfileResponseDto } from '../responses/client-profile.response.dto';
import { ClientProfileService } from '../services/client-profile.service';
import { USER_ROLE } from '../types/user-roles.type';

@ApiTags('Users - Client-profile')
@Roles(USER_ROLE.CLIENT)
@UseGuards(RolesGuard)
@UseGuards(FirebaseGuard)
@Controller('/me/client-profile')
export class ClientProfileController {
  constructor(public clientProfileService: ClientProfileService) {}

  @ApiResponse({
    type: ClientProfileResponseDto,
  })
  @Get('/')
  getClientProfile(
    @AuthUser() authUser: User,
  ): SerializedResponse<ClientProfile, ClientProfileResponseDto> {
    return serialize(authUser.clientProfile, ClientProfileResponseDto);
  }
}
