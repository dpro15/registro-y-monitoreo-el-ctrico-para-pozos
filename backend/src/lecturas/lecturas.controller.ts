import { Controller, Get, Post, Body } from '@nestjs/common';

import { Patch } from '@nestjs/common';

import { Delete, Param, } from '@nestjs/common';

import { LecturasService } from './lecturas.service';

import { Lectura } from './entities/lectura.entity';

@Controller('lecturas')
export class LecturasController {

  constructor(
    private readonly lecturasService: LecturasService,
  ) {}

  @Delete(':id')
eliminar(@Param('id') id: string) {
  return this.lecturasService.eliminar(+id);
}

  @Post()
  crear(@Body() lectura: Lectura) {
    return this.lecturasService.crear(lectura);
  }

  @Get()
  listar() {
    return this.lecturasService.listar();
  }

  @Patch(':id/observacion')
  editarObservacion(
  @Param('id') id: number,
  @Body() body: { observacion: string },
  ) {
  return this.lecturasService.editarObservacion(id, body.observacion);
  }
  
}
