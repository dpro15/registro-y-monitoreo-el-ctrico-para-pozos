import { Controller, Get } from '@nestjs/common';

import { PozosService } from './pozos.service';

@Controller('pozos')
export class PozosController {

  @Get()
  listar() {

    return [
      { id: 1, nombre: 'POZO CUETO 1' },
      { id: 2, nombre: 'POZO CUETO 2' },
      { id: 3, nombre: 'POZO 32' },
      { id: 4, nombre: 'POZO SUR' },
      { id: 5, nombre: 'POZO CENTRO' },
      { id: 6, nombre: 'POZO NORTE' },
      { id: 7, nombre: 'POZO PARAISO' },
      { id: 8, nombre: 'POZO RIVERA' },
      { id: 9, nombre: 'POZO CESPEDES' },
      { id: 10, nombre: 'POZO 10' },
      { id: 11, nombre: 'POZO R3' },
      { id: 12, nombre: 'POZO CHANCA' },
    ];
  }
}
