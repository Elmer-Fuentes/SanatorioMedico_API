/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Sucursales
 * Descripción  : Lógica de negocio del CRUD de Sucursales (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarSucursalesDto } from './dto/agregar-sucursales.dto.js';
import { EditarSucursalesDto } from './dto/editar-sucursales.dto.js';

@Injectable()
export class SucursalesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR SUCURSALES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigosucursal               AS "codigoSucursal",
          nombresucursal               AS "nombreSucursal",
          direccion                    AS "direccion",
          fechaapertura                AS "fechaApertura",
          horaapertura                 AS "horaApertura",
          presupuestomensual           AS "presupuestoMensual",
          estado                       AS "estado"
        FROM Usp_Sucursales_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Sucursales consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar sucursales.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR SUCURSALES POR CÓDIGO
  // ============================================================
  async buscar(codigoSucursal: number) {
    try {
      if (!Number.isInteger(codigoSucursal) || codigoSucursal <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigosucursal               AS "codigoSucursal",
          nombresucursal               AS "nombreSucursal",
          direccion                    AS "direccion",
          fechaapertura                AS "fechaApertura",
          horaapertura                 AS "horaApertura",
          presupuestomensual           AS "presupuestoMensual",
          estado                       AS "estado"
        FROM Usp_Sucursales_Buscar($1);
        `,
        [codigoSucursal],
      );

      return {
        exito: 1,
        mensaje: 'Registro de sucursales encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de sucursales.';
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
  // FUNCIONALIDAD: AGREGAR SUCURSALES
  // ============================================================
  async agregar(dto: AgregarSucursalesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Sucursales_Agregar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        );
        `,
        [
        dto.nombreSucursal,
        dto.direccion,
        dto.fechaApertura,
        dto.horaApertura,
        dto.presupuestoMensual,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoSucursal: fila.codigosucursal,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de sucursales.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR SUCURSALES
  // ============================================================
  async editar(codigo: number, dto: EditarSucursalesDto) {
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
        FROM Usp_Sucursales_Editar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7
        );
        `,
        [
        codigo,
        dto.nombreSucursal,
        dto.direccion,
        dto.fechaApertura,
        dto.horaApertura,
        dto.presupuestoMensual,
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
          : 'Error desconocido al editar el registro de sucursales.';
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
  // FUNCIONALIDAD: ELIMINAR SUCURSALES
  // ============================================================
  async eliminar(codigoSucursal: number) {
    try {
      if (!Number.isInteger(codigoSucursal) || codigoSucursal <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Sucursales_Eliminar($1);
        `,
        [codigoSucursal],
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
          : 'Error desconocido al eliminar el registro de sucursales.';
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
