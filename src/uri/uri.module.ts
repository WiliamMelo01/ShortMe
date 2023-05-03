import { Module } from '@nestjs/common';
import { UriController } from './uri.controller';
import { UriService } from './uri.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UriController],
  providers: [UriService, PrismaService],
})
export class UriModule {}
