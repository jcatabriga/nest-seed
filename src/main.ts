import { appConfig } from '@config/app';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TimeoutInterceptor } from 'common/interceptors/timeout.interceptor';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function createSwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Shoulders')
    .setDescription(
      `**The Shoulders API** <br>
        Here you can access and run all application endpoints. <br>
        If you are a developer, look at the default to always keep it.
    `,
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('roles')
    .addTag('contacts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());

  createSwaggerConfig(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(appConfig.PORT);
}

bootstrap();
