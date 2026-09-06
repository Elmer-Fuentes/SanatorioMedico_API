/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Horarios
 * Descripción  : Definición del módulo NestJS de Horarios.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { HorariosController } from './horarios.controller.js';
import { HorariosService } from './horarios.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [HorariosController],
  providers: [HorariosService],
})
export class HorariosModule {}
