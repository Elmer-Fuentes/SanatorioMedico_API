/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Facturas
 * Descripción  : Definición del módulo NestJS de Facturas.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { FacturasController } from './facturas.controller.js';
import { FacturasService } from './facturas.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
