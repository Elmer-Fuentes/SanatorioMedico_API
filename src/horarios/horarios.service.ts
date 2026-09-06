/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Horarios
 * Descripción  : Lógica de negocio del CRUD de Horarios (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarHorariosDto } from './dto/agregar-horarios.dto.js';
import { EditarHorariosDto } from './dto/editar-horarios.dto.js';

@Injectable()
export class HorariosService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR HORARIOS
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigohorario                AS "codigoHorario",
          codigocolaborador            AS "codigoColaborador",
          codigosucursal               AS "codigoSucursal",
          codigoespecialidad           AS "codigoEspecialidad",
          diasemana                    AS "diaSemana",
          horainicio                   AS "horaInicio",
          horafin                      AS "horaFin",
          duracioncitaminutos          AS "duracionCitaMinutos",
          jornada                      AS "jornada",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_Horarios_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Horarios consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar horarios.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR HORARIOS POR CÓDIGO
  // ============================================================
  async buscar(codigoHorario: number) {
    try {
      if (!Number.isInteger(codigoHorario) || codigoHorario <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigohorario                AS "codigoHorario",
          codigocolaborador            AS "codigoColaborador",
          codigosucursal               AS "codigoSucursal",
          codigoespecialidad           AS "codigoEspecialidad",
          diasemana                    AS "diaSemana",
          horainicio                   AS "horaInicio",
          horafin                      AS "horaFin",
          duracioncitaminutos          AS "duracionCitaMinutos",
          jornada                      AS "jornada",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_Horarios_Buscar($1);
        `,
        [codigoHorario],
      );

      return {
        exito: 1,
        mensaje: 'Registro de horarios encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de horarios.';
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
  // FUNCIONALIDAD: AGREGAR HORARIOS
  // ============================================================
  async agregar(dto: AgregarHorariosDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Horarios_Agregar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10
        );
        `,
        [
        dto.codigoColaborador,
        dto.codigoSucursal,
        dto.codigoEspecialidad,
        dto.diaSemana,
        dto.horaInicio,
        dto.horaFin,
        dto.duracionCitaMinutos,
        dto.jornada,
        dto.observaciones,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoHorario: fila.codigohorario,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de horarios.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR HORARIOS
  // ============================================================
  async editar(codigo: number, dto: EditarHorariosDto) {
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
        FROM Usp_Horarios_Editar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11
        );
        `,
        [
        codigo,
        dto.codigoColaborador,
        dto.codigoSucursal,
        dto.codigoEspecialidad,
        dto.diaSemana,
        dto.horaInicio,
        dto.horaFin,
        dto.duracionCitaMinutos,
        dto.jornada,
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
          : 'Error desconocido al editar el registro de horarios.';
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
  // FUNCIONALIDAD: ELIMINAR HORARIOS
  // ============================================================
  async eliminar(codigoHorario: number) {
    try {
      if (!Number.isInteger(codigoHorario) || codigoHorario <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Horarios_Eliminar($1);
        `,
        [codigoHorario],
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
          : 'Error desconocido al eliminar el registro de horarios.';
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
