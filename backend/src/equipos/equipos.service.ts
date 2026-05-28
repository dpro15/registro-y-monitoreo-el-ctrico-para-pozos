import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Equipo } from './entities/equipo.entity';

@Injectable()
export class EquiposService {

  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

  async crear(equipo: Equipo) {
    return await this.equipoRepository.save(equipo);
  }

  async listar() {
    return await this.equipoRepository.find();
  }
}
