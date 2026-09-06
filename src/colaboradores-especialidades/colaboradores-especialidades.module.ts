/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : ColaboradoresEspecialidades
 * Descripción  : Definición del módulo NestJS de ColaboradoresEspecialidades.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ColaboradoresEspecialidadesController } from './colaboradores-especialidades.controller.js';
import { ColaboradoresEspecialidadesService } from './colaboradores-especialidades.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ColaboradoresEspecialidadesController],
  providers: [ColaboradoresEspecialidadesService],
})
export class ColaboradoresEspecialidadesModule {}
