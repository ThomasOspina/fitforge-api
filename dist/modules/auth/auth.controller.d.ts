import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getStatus(): {
        status: string;
    };
    register(registerDto: RegisterDto): Promise<AuthResponse>;
}
