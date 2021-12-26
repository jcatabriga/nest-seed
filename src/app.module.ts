import { appConfig } from '@config/app';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TimeoutInterceptor } from 'common/interceptors/timeout.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ContactsModule,
    ThrottlerModule.forRoot({
      ttl: appConfig.RATE_LIMITERS.ttl,
      limit: appConfig.RATE_LIMITERS.limit,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
