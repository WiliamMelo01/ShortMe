import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createNewShortUrlDto {
  @IsUrl()
  @ApiProperty()
  linkToRedirect: string;
}
