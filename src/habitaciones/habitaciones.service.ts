/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Habitaciones
 * Descripción  : Lógica de negocio del CRUD de Habitaciones (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarHabitacionesDto } from './dto/agregar-habitaciones.dto.js';
import { EditarHabitacionesDto } from './dto/editar-habitaciones.dto.js';

@Injectable()
export class HabitacionesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR HABITACIONES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigohabitacion             AS "codigoHabitacion",
          codigosucursal               AS "codigoSucursal",
          numerohabitacion             AS "numeroHabitacion",
          codigocama                   AS "codigoCama",
          tipohabitacion               AS "tipoHabitacion",
          piso                         AS "piso",
          capacidad                    AS "capacidad",
          tarifadiaria                 AS "tarifaDiaria",
          descripcion                  AS "descripcion",
          estado                       AS "estado"
        FROM Usp_Habitaciones_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Habitaciones consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar habitaciones.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR HABITACIONES POR CÓDIGO
  // ============================================================
  async buscar(codigoHabitacion: number) {
    try {
      if (!Number.isInteger(codigoHabitacion) || codigoHabitacion <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigohabitacion             AS "codigoHabitacion",
          codigosucursal               AS "codigoSucursal",
          numerohabitacion             AS "numeroHabitacion",
          codigocama                   AS "codigoCama",
          tipohabitacion               AS "tipoHabitacion",
          piso                         AS "piso",
          capacidad                    AS "capacidad",
          tarifadiaria                 AS "tarifaDiaria",
          descripcion                  AS "descripcion",
          estado                       AS "estado"
        FROM Usp_Habitaciones_Buscar($1);
        `,
        [codigoHabitacion],
      );

      return {
        exito: 1,
        mensaje: 'Registro de habitaciones encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de habitaciones.';
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
  // FUNCIONALIDAD: AGREGAR HABITACIONES
  // ============================================================
  async agregar(dto: AgregarHabitacionesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Habitaciones_Agregar(
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
        dto.codigoSucursal,
        dto.numeroHabitacion,
        dto.codigoCama,
        dto.tipoHabitacion,
        dto.piso,
        dto.capacidad,
        dto.tarifaDiaria,
        dto.descripcion,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoHabitacion: fila.codigohabitacion,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de habitaciones.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR HABITACIONES
  // ============================================================
  async editar(codigo: number, dto: EditarHabitacionesDto) {
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
        FROM Usp_Habitaciones_Editar(
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
        codigo,
        dto.codigoSucursal,
        dto.numeroHabitacion,
        dto.codigoCama,
        dto.tipoHabitacion,
        dto.piso,
        dto.capacidad,
        dto.tarifaDiaria,
        dto.descripcion,
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
          : 'Error desconocido al editar el registro de habitaciones.';
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
  // FUNCIONALIDAD: ELIMINAR HABITACIONES
  // ============================================================
  async eliminar(codigoHabitacion: number) {
    try {
      if (!Number.isInteger(codigoHabitacion) || codigoHabitacion <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Habitaciones_Eliminar($1);
        `,
        [codigoHabitacion],
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
          : 'Error desconocido al eliminar el registro de habitaciones.';
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
