import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(registerDto: RegisterDto): Promise<{
        username: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        username: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findById(id: string): Promise<{
        username: string;
        email: string;
        password: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
