import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pozo } from './entities/pozo.entity';
import { PozosController } from './pozos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pozo]),
  ],

  controllers: [PozosController],

  exports: [
    TypeOrmModule,
  ],
})
export class PozosModule {}
