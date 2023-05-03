import { Module } from '@nestjs/common';
import { UriModule } from './uri/uri.module';

@Module({
  imports: [UriModule],
})
export class AppModule {}
