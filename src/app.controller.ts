import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { AuthService } from 'auth/auth.service';
import { PublicResource } from '@common/decorators/public-resource.decorator';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @PublicResource()
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @PublicResource()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req() req: Request & { user: Partial<User> },
    @Res({ passthrough: true }) response: Response,
  ) {
    const login = await this.authService.login(req.user);
    response.cookie('access_token', login.access_token);
    return login;
  }
}
