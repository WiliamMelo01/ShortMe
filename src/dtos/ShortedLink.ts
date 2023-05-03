import { ApiProperty } from '@nestjs/swagger';

export class ShortedLink {
  @ApiProperty()
  id: string;

  @ApiProperty()
  linkToRedirect: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  shortnedLink: string;

  @ApiProperty()
  expirationDate: Date;
}
