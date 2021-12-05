import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ClientProfileController } from './controllers/client-profile.controller';
import { MeController } from './controllers/me.controller';
import { ProProfileController } from './controllers/pro-profile.controller';
import { UsersController } from './controllers/users.controller';
import { ClientProfile } from './entities/client-profile.entity';
import { LegalProfile } from './entities/legal-profile.entity';
import { ProProfile } from './entities/pro-profile.entity';
import { UserConfig } from './entities/user-config.entity';
import { User } from './entities/user.entity';
import { ClientProfileService } from './services/client-profile.service';
import { ProProfileService } from './services/pro-profile.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserConfig,
      ProProfile,
      ClientProfile,
      LegalProfile,
    ]),
  ],
  controllers: [
    UsersController,
    ClientProfileController,
    ProProfileController,
    MeController,
  ],
  providers: [UsersService, ClientProfileService, ProProfileService],
  exports: [],
})
export class UsersModule {}
