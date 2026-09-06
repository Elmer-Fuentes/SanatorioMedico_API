/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : FacturasDetalle
 * Descripción  : Definición del módulo NestJS de FacturasDetalle.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { FacturasDetalleController } from './facturas-detalle.controller.js';
import { FacturasDetalleService } from './facturas-detalle.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [FacturasDetalleController],
  providers: [FacturasDetalleService],
})
export class FacturasDetalleModule {}
