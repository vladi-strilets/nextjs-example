import { Injectable } from '@nestjs/common';
import { ProProfile } from '../entities/pro-profile.entity';
import { CreateProProfileInterface } from '../interfaces/create-pro-profile.interface';

@Injectable()
export class ProProfileService {
  async createProProfile(dto: CreateProProfileInterface) {
    await ProProfile.create(dto).save();
  }

  // async updateProProfile(user: User, dto: UpdateProProfileRequestDto) {
  //   return {};
  // }
}
