import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './passport-strategies/firebase-auth.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), PassportModule],
  controllers: [],
  providers: [FirebaseAuthStrategy],
  exports: [],
})
export class AuthModule {}
