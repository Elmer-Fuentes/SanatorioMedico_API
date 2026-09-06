/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Especialidades
 * Descripción  : Lógica de negocio del CRUD de Especialidades (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarEspecialidadesDto } from './dto/agregar-especialidades.dto.js';
import { EditarEspecialidadesDto } from './dto/editar-especialidades.dto.js';

@Injectable()
export class EspecialidadesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR ESPECIALIDADES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigoespecialidad           AS "codigoEspecialidad",
          nombreespecialidad           AS "nombreEspecialidad",
          descripcion                  AS "descripcion",
          areamedica                   AS "areaMedica",
          duracionconsulta             AS "duracionConsulta",
          costoconsulta                AS "costoConsulta",
          requierecita                 AS "requiereCita",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_Especialidades_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Especialidades consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar especialidades.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR ESPECIALIDADES POR CÓDIGO
  // ============================================================
  async buscar(codigoEspecialidad: number) {
    try {
      if (!Number.isInteger(codigoEspecialidad) || codigoEspecialidad <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigoespecialidad           AS "codigoEspecialidad",
          nombreespecialidad           AS "nombreEspecialidad",
          descripcion                  AS "descripcion",
          areamedica                   AS "areaMedica",
          duracionconsulta             AS "duracionConsulta",
          costoconsulta                AS "costoConsulta",
          requierecita                 AS "requiereCita",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_Especialidades_Buscar($1);
        `,
        [codigoEspecialidad],
      );

      return {
        exito: 1,
        mensaje: 'Registro de especialidades encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de especialidades.';
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
  // FUNCIONALIDAD: AGREGAR ESPECIALIDADES
  // ============================================================
  async agregar(dto: AgregarEspecialidadesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Especialidades_Agregar(
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
        dto.nombreEspecialidad,
        dto.descripcion,
        dto.areaMedica,
        dto.duracionConsulta,
        dto.costoConsulta,
        dto.requiereCita,
        dto.observaciones,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoEspecialidad: fila.codigoespecialidad,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de especialidades.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR ESPECIALIDADES
  // ============================================================
  async editar(codigo: number, dto: EditarEspecialidadesDto) {
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
        FROM Usp_Especialidades_Editar(
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
        dto.nombreEspecialidad,
        dto.descripcion,
        dto.areaMedica,
        dto.duracionConsulta,
        dto.costoConsulta,
        dto.requiereCita,
        dto.observaciones,
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
          : 'Error desconocido al editar el registro de especialidades.';
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
  // FUNCIONALIDAD: ELIMINAR ESPECIALIDADES
  // ============================================================
  async eliminar(codigoEspecialidad: number) {
    try {
      if (!Number.isInteger(codigoEspecialidad) || codigoEspecialidad <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Especialidades_Eliminar($1);
        `,
        [codigoEspecialidad],
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
          : 'Error desconocido al eliminar el registro de especialidades.';
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
