/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultas
 * Descripción  : Definición del módulo NestJS de CitasConsultas.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { CitasConsultasController } from './citas-consultas.controller.js';
import { CitasConsultasService } from './citas-consultas.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [CitasConsultasController],
  providers: [CitasConsultasService],
})
export class CitasConsultasModule {}
