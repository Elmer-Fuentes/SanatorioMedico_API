/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Proveedores
 * Descripción  : Definición del módulo NestJS de Proveedores.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ProveedoresController } from './proveedores.controller.js';
import { ProveedoresService } from './proveedores.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
