import { Inject, Injectable } from '@nestjs/common';
import { createNewShortUriDto } from 'src/dtos/createShortUri.dto';
import { PrismaService } from '../prisma.service';
import { v4 } from 'uuid';
import { addDays } from 'date-fns';

@Injectable()
export class UriService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getAllShortUris() {
    return await this.prismaService.uRI.findMany();
  }

  async createNewShortUri(data: createNewShortUriDto) {
    const hash = v4();
    const expirationDate = addDays(new Date(), 1);

    return await this.prismaService.uRI.create({
      data: {
        linkToRedirect: data.linkToRedirect,
        hash,
        shortnedLink: `http://localhost:3000/uri/${hash}`,
        expirationDate,
      },
    });
  }

  async findUriByHash(uri: string) {
    const uriData = await this.prismaService.uRI.findUnique({
      where: {
        hash: uri,
      },
    });
    return uriData;
  }
}
