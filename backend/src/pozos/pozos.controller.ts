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

import { Controller, Get } from '@nestjs/common';
import { PozosService } from './pozos.service';

@Controller('pozos')
export class PozosController {

  @Get()
  listar() {
    return [
      {
        id: 999,
        nombre: 'PRUEBA DIEGO'
      }
    ];
  }
}
