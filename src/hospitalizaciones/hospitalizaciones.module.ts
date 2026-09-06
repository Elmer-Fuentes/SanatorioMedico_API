/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Hospitalizaciones
 * Descripción  : Definición del módulo NestJS de Hospitalizaciones.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { HospitalizacionesController } from './hospitalizaciones.controller.js';
import { HospitalizacionesService } from './hospitalizaciones.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [HospitalizacionesController],
  providers: [HospitalizacionesService],
})
export class HospitalizacionesModule {}
