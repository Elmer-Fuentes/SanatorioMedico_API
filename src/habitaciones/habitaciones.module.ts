/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Habitaciones
 * Descripción  : Definición del módulo NestJS de Habitaciones.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { HabitacionesController } from './habitaciones.controller.js';
import { HabitacionesService } from './habitaciones.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
})
export class HabitacionesModule {}
