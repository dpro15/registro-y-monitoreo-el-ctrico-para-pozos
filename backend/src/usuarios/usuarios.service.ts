import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(usuario: Usuario) {
    return await this.usuarioRepository.save(usuario);
  }

  async listar() {
    return await this.usuarioRepository.find();
  }
  async login(nombre: string, contrasena: string) {

  const usuario = await this.usuarioRepository.findOne({
    where: {
      nombre,
      contrasena,
    },
  });

  return {
    token: 'token-demo',
    usuario,
  };
}
}
