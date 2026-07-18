import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';

import { BCRYPT_CONSTANTS } from './constants/bcrypt.constants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered.');
    }

    const passwordHash = await bcrypt.hash(
      registerDto.password,
      BCRYPT_CONSTANTS.SALT_ROUNDS,
    );

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: registerDto.email,
          passwordHash,
        },
      });

      await tx.profile.create({
        data: {
          userId: user.id,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          birthDate: new Date(registerDto.birthDate),
          sex: registerDto.sex,
          heightCm: registerDto.heightCm,
          weightKg: registerDto.weightKg,
          targetWeightKg: registerDto.targetWeightKg,
          goal: registerDto.goal,
        },
      });

      return user;
    });

    return {
      message: 'User registered successfully.',
      user: {
        id: result.id,
        email: result.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      },
    };
  }

  async validateUser(loginDto: LoginDto): Promise<AuthenticatedUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.profile) {
      throw new UnauthorizedException('User profile not found.');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
    };
  }

  private async generateTokens(user: AuthenticatedUser): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken: string = await this.jwtService.signAsync(payload);

    const refreshToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginDto);

    const tokens = await this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  getStatus(): { status: string } {
    return {
      status: 'Auth module is running.',
    };
  }
}
