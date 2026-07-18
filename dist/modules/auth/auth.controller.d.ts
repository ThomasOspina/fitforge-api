import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { LoginResponse } from './interfaces/login-response.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getStatus(): {
        status: string;
    };
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<LoginResponse>;
}
