import { Injectable } from '@nestjs/common';
import { ClientProfile } from '../entities/client-profile.entity';
import { CreateClientProfileInterface } from '../interfaces/create-client-profile.interface';

@Injectable()
export class ClientProfileService {
  async createClientProfile(dto: CreateClientProfileInterface): Promise<void> {
    await ClientProfile.create(dto).save();
  }

  // async updateClientProfile(user: User, dto: UpdateClientProfileRequestDto) {
  //   return {};
  // }
}
