import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/entities/user.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    return compare(providedPass, storedPass);
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await this.comparePassword(pass, user.password);
    if (!isPasswordValid) {
      return null;
    }
    const { password, ...rest } = user;
    return rest;
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
