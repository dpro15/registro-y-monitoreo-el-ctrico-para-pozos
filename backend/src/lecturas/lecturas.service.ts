import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lectura } from './entities/lectura.entity';

@Injectable()
export class LecturasService {

  constructor(
    @InjectRepository(Lectura)
    private lecturaRepository: Repository<Lectura>,
  ) {}

  async crear(lectura: Lectura) {

    return await this.lecturaRepository.save(lectura);

  }

  async listar() {

    return await this.lecturaRepository.find({
      relations: {
        usuario: true,
        pozo: true,
      },

      order: {
        fecha: 'DESC',
      },
    });

  }

  async eliminar(id: number) {

  return await this.lecturaRepository.delete(id);

}
}
