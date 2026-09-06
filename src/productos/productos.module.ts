/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Productos
 * Descripción  : Definición del módulo NestJS de Productos.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ProductosController } from './productos.controller.js';
import { ProductosService } from './productos.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
