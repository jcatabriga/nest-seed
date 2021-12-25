import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [UsersModule, RolesModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
