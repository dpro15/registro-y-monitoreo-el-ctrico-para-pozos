import { Controller, Get, Post, Body } from '@nestjs/common';

import { EquiposService } from './equipos.service';

import { Equipo } from './entities/equipo.entity';

@Controller('equipos')
export class EquiposController {

  constructor(
    private readonly equiposService: EquiposService,
  ) {}

  @Post()
  crear(@Body() equipo: Equipo) {
    return this.equiposService.crear(equipo);
  }

  @Get()
  listar() {
    return this.equiposService.listar();
  }
}
