/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Roles
 * Descripción  : Definición del módulo NestJS de Roles.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { RolesController } from './roles.controller.js';
import { RolesService } from './roles.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
