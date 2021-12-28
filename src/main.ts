import { appConfig } from '@config/app';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TimeoutInterceptor } from 'common/interceptors/timeout.interceptor';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function createSwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(appConfig.SWAGGER.title)
    .setDescription(appConfig.SWAGGER.description)
    .setVersion(appConfig.SWAGGER.version)
    .addTag('users')
    .addTag('roles')
    .addTag('contacts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const reflector = app.get(Reflector);
  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new ClassSerializerInterceptor(reflector),
  );

  createSwaggerConfig(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
