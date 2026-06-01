import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Pozo } from './entities/pozo.entity';

@Injectable()

export class PozosService {

  constructor(

    @InjectRepository(Pozo)
    private pozoRepository: Repository<Pozo>,

  ) {}

  findAll() {

    return this.pozoRepository.find();

  }

}
