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
import { createNewShortUriDto } from 'src/dtos/createShortUri.dto';
import { UriService } from './uri.service';
import { Response } from 'express';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ShortedLink } from 'src/dtos/ShortedLink';

@ApiTags('Uri')
@Controller('uri')
export class UriController {
  constructor(@Inject(UriService) private uriService: UriService) {}

  @Get('/all')
  @ApiOkResponse({
    type: [ShortedLink],
    schema: {
      example: {
        id: '7f6d16f4-ba95-4c84-abdc-bb8775985a3f',
        linkToRedirect: 'https://pt-br.facebook.com/',
        hash: '7f86fef5-32de-4626-90c7-681433713d32',
        shortnedLink:
          'http://localhost:3000/uri/7f86fef5-32de-4626-90c7-681433713d32',
      },
    },
  })
  async getAllShortUris() {
    return await this.uriService.getAllShortUris();
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
          'http://localhost:3000/uri/7f86fef5-32de-4626-90c7-681433713d32',
      },
    },
  })
  async createNewShortUri(
    @Body() body: createNewShortUriDto,
    @Res() response: Response,
  ) {
    const result = await this.uriService.createNewShortUri(body);
    return response.status(HttpStatus.CREATED).json(result);
  }

  @Get('/:uri')
  async redirect(@Param('uri') uri: string, @Res() response: Response) {
    const result = await this.uriService.findUriByHash(uri);
    if (!result) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    return response.redirect(result.linkToRedirect);
  }
}
