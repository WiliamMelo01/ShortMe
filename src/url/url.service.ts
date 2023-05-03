import { Inject, Injectable } from '@nestjs/common';
import { createNewShortUrlDto } from 'src/dtos/createShortUrl.dto';
import { PrismaService } from '../prisma.service';
import { v4 } from 'uuid';
import { addDays } from 'date-fns';

@Injectable()
export class UrlService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getAllShortUrls() {
    return await this.prismaService.uRL.findMany();
  }

  async createNewShortUrl(data: createNewShortUrlDto) {
    const hash = v4().slice(0, 4);
    const expirationDate = addDays(new Date(), 1);

    return await this.prismaService.uRL.create({
      data: {
        linkToRedirect: data.linkToRedirect,
        hash,
        shortnedLink: `${process.env.SERVER_URL}/url/${hash}`,
        expirationDate,
      },
    });
  }

  async findUrlByHash(url: string) {
    const urlData = await this.prismaService.uRL.findUnique({
      where: {
        hash: url,
      },
    });
    return urlData;
  }
}
