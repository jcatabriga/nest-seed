import { AuthModule } from '@auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
