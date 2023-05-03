import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createNewShortUriDto {
  @IsUrl()
  @ApiProperty()
  linkToRedirect: string;
}
