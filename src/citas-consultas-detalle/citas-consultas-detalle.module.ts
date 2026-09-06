/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultasDetalle
 * Descripción  : Definición del módulo NestJS de CitasConsultasDetalle.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { CitasConsultasDetalleController } from './citas-consultas-detalle.controller.js';
import { CitasConsultasDetalleService } from './citas-consultas-detalle.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [CitasConsultasDetalleController],
  providers: [CitasConsultasDetalleService],
})
export class CitasConsultasDetalleModule {}
