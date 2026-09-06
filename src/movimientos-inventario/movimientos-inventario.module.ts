/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : MovimientosInventario
 * Descripción  : Definición del módulo NestJS de MovimientosInventario.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { MovimientosInventarioController } from './movimientos-inventario.controller.js';
import { MovimientosInventarioService } from './movimientos-inventario.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [MovimientosInventarioController],
  providers: [MovimientosInventarioService],
})
export class MovimientosInventarioModule {}
