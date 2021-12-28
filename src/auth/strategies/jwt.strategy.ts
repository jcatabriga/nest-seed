import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface Payload {
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * You can add your own custom user validation, but it's not necessary
   * Also, you can use the payload.sub to get the user id and use it to get the user from the database
   */
  async validate(payload: Payload) {
    return { userId: payload.sub, email: payload.email };
  }
}
