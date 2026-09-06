/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Database
 * Descripción  : Módulo global de conexión a PostgreSQL (expone DatabaseService).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service.js';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
