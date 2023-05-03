import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { createNewShortUrlDto } from 'src/dtos/createShortUrl.dto';
import { UrlService } from './url.service';
import { Response } from 'express';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ShortedLink } from 'src/dtos/ShortedLink';

@ApiTags('Url')
@Controller('url')
export class UrlController {
  constructor(@Inject(UrlService) private urlService: UrlService) {}

  @Get('/all')
  @ApiOkResponse({
    type: [ShortedLink],
    schema: {
      example: {
        id: '7f6d16f4-ba95-4c84-abdc-bb8775985a3f',
        linkToRedirect: 'https://pt-br.facebook.com/',
        hash: '7f86fef5-32de-4626-90c7-681433713d32',
        shortnedLink:
          'http://localhost:3000/url/7f86fef5-32de-4626-90c7-681433713d32',
      },
    },
  })
  async getAllShortUrls() {
    return await this.urlService.getAllShortUrls();
  }

  @Post('/create')
  @ApiCreatedResponse({
    type: [ShortedLink],
    schema: {
      example: {
        id: '7f6d16f4-ba95-4c84-abdc-bb8775985a3f',
        linkToRedirect: 'https://pt-br.facebook.com/',
        hash: '7f86fef5-32de-4626-90c7-681433713d32',
        shortnedLink:
          'http://localhost:3000/url/7f86fef5-32de-4626-90c7-681433713d32',
      },
    },
  })
  async createNewShortUrl(
    @Body() body: createNewShortUrlDto,
    @Res() response: Response,
  ) {
    const result = await this.urlService.createNewShortUrl(body);
    return response
      .status(HttpStatus.CREATED)
      .json({ newUrl: result.shortnedLink });
  }

  @Get('/:url')
  async redirect(@Param('url') url: string, @Res() response: Response) {
    const result = await this.urlService.findUrlByHash(url);
    if (!result) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    return response.redirect(result.linkToRedirect);
  }
}
