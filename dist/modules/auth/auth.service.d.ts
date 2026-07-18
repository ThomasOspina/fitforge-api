import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { LoginResponse } from './interfaces/login-response.interface';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    validateUser(loginDto: LoginDto): Promise<AuthenticatedUser>;
    private generateTokens;
    login(loginDto: LoginDto): Promise<LoginResponse>;
    getStatus(): {
        status: string;
    };
}
