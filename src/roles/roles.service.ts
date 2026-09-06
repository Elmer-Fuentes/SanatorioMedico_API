/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Roles
 * Descripción  : Lógica de negocio del CRUD de Roles (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarRolesDto } from './dto/agregar-roles.dto.js';
import { EditarRolesDto } from './dto/editar-roles.dto.js';

@Injectable()
export class RolesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR ROLES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigorol                    AS "codigoRol",
          nombrerol                    AS "nombreRol",
          descripcionrol               AS "descripcionRol",
          moduloprincipal              AS "moduloPrincipal",
          permiteconsultar             AS "permiteConsultar",
          permiteagregar               AS "permiteAgregar",
          permiteeditar                AS "permiteEditar",
          permiteanular                AS "permiteAnular",
          estado                       AS "estado"
        FROM Usp_Roles_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Roles consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar roles.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR ROLES POR CÓDIGO
  // ============================================================
  async buscar(codigoRol: number) {
    try {
      if (!Number.isInteger(codigoRol) || codigoRol <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigorol                    AS "codigoRol",
          nombrerol                    AS "nombreRol",
          descripcionrol               AS "descripcionRol",
          moduloprincipal              AS "moduloPrincipal",
          permiteconsultar             AS "permiteConsultar",
          permiteagregar               AS "permiteAgregar",
          permiteeditar                AS "permiteEditar",
          permiteanular                AS "permiteAnular",
          estado                       AS "estado"
        FROM Usp_Roles_Buscar($1);
        `,
        [codigoRol],
      );

      return {
        exito: 1,
        mensaje: 'Registro de roles encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de roles.';
      const mensaje = mensajeCompleto.includes(
        'No se encontró el registro solicitado.',
      )
        ? 'No se encontró el registro solicitado.'
        : mensajeCompleto;
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: AGREGAR ROLES
  // ============================================================
  async agregar(dto: AgregarRolesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Roles_Agregar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        );
        `,
        [
        dto.nombreRol,
        dto.descripcionRol,
        dto.moduloPrincipal,
        dto.permiteConsultar,
        dto.permiteAgregar,
        dto.permiteEditar,
        dto.permiteAnular,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoRol: fila.codigorol,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de roles.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR ROLES
  // ============================================================
  async editar(codigo: number, dto: EditarRolesDto) {
    try {
      if (!Number.isInteger(codigo) || codigo <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Roles_Editar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9
        );
        `,
        [
        codigo,
        dto.nombreRol,
        dto.descripcionRol,
        dto.moduloPrincipal,
        dto.permiteConsultar,
        dto.permiteAgregar,
        dto.permiteEditar,
        dto.permiteAnular,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al editar el registro de roles.';
      const mensaje = mensajeCompleto.includes(
        'No se encontró el registro solicitado.',
      )
        ? 'No se encontró el registro solicitado.'
        : mensajeCompleto;
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: ELIMINAR ROLES
  // ============================================================
  async eliminar(codigoRol: number) {
    try {
      if (!Number.isInteger(codigoRol) || codigoRol <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Roles_Eliminar($1);
        `,
        [codigoRol],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al eliminar el registro de roles.';
      const mensaje = mensajeCompleto.includes(
        'No se encontró el registro solicitado.',
      )
        ? 'No se encontró el registro solicitado.'
        : mensajeCompleto;
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }
}
