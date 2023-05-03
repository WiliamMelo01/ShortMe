import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import * as schedule from 'node-schedule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ShortyMe')
    .setDescription(
      'ShortyMe - A simple URL shortener API built with NestJS and Prisma.',
    )
    .setVersion('1.0')
    .setContact(
      'Wiliam Melo da Mota',
      'https://github.com/WiliamMelo01',
      'Wiliammelo.mota@gmail.com',
    )
    .addTag('Url')
    .addServer(process.env.SERVER_URL)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors();

  await app.listen(process.env.PORT);

  async function removeExpiredData() {
    const prismaService = new PrismaService();
    const expiredData = await prismaService.uRL.findMany({
      where: {
        expirationDate: {
          lt: new Date(),
        },
      },
    });
    await Promise.all(
      expiredData.map(async (data) => {
        await prismaService.uRL.delete({
          where: {
            id: data.id,
          },
        });
      }),
    );

    console.log('All expirated data has been deleted');
  }

  schedule.scheduleJob('0 * * * *', removeExpiredData);
}

bootstrap();
