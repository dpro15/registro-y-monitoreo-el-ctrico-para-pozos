//import { Controller, Get } from '@nestjs/common';

//@Controller('pozos')
//export class PozosController {
//
//  constructor(
//    private readonly pozosService: PozosService,
//  ) {}
//
//  @Get()
//  listar() {
//    return this.pozosService.findAll();
//  }
//}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { PozosService } from './pozos.service';
import { Pozo } from './entities/pozo.entity';

@Controller('pozos')
export class PozosController {

  constructor(
    private readonly pozosService: PozosService,
  ) {}

  @Post()
  crear(@Body() pozo: Pozo) {
    return this.pozosService.crear(pozo);
  }

  @Get()
  listar() {
    return this.pozosService.findAll();
  }
}
