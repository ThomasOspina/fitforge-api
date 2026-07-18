import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.secret'),

        signOptions: {
          expiresIn: configService.getOrThrow('jwt.expiresIn'),
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService],

  exports: [AuthService],
})
export class AuthModule {}
