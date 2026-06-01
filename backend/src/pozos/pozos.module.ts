import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pozo } from './entities/pozo.entity';
import { PozosController } from './pozos.controller';
import { PozosService } from './pozos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pozo]),
  ],

  controllers: [PozosController],

  providers: [PozosService],

  exports: [
    PozosService,
    TypeOrmModule,
  ],
})
export class PozosModule {}