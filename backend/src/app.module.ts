import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsuariosModule } from './usuarios/usuarios.module';
import { PozosModule } from './pozos/pozos.module';
import { LecturasModule } from './lecturas/lecturas.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),

      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,

      database: process.env.DB_NAME,

      ssl: {
        rejectUnauthorized: false,
      },

      autoLoadEntities: true,
      synchronize: true,
    }),

    UsuariosModule,
    PozosModule,
    LecturasModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}