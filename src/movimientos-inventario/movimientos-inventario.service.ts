/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : MovimientosInventario
 * Descripción  : Lógica de negocio del CRUD de MovimientosInventario (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarMovimientosInventarioDto } from './dto/agregar-movimientos-inventario.dto.js';
import { EditarMovimientosInventarioDto } from './dto/editar-movimientos-inventario.dto.js';

@Injectable()
export class MovimientosInventarioService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR MOVIMIENTOSINVENTARIO
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigomovimientoinventario   AS "codigoMovimientoInventario",
          codigosucursal               AS "codigoSucursal",
          codigoproducto               AS "codigoProducto",
          codigoproveedor              AS "codigoProveedor",
          codigocolaborador            AS "codigoColaborador",
          fechahoramovimiento          AS "fechaHoraMovimiento",
          tipomovimiento               AS "tipoMovimiento",
          numerodocumento              AS "numeroDocumento",
          lote                         AS "lote",
          fechavencimiento             AS "fechaVencimiento",
          cantidadentrada              AS "cantidadEntrada",
          cantidadsalida               AS "cantidadSalida",
          costounitario                AS "costoUnitario",
          existenciaresultante         AS "existenciaResultante",
          motivomovimiento             AS "motivoMovimiento",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_MovimientosInventario_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'MovimientosInventario consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar movimientosinventario.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR MOVIMIENTOSINVENTARIO POR CÓDIGO
  // ============================================================
  async buscar(codigoMovimientoInventario: number) {
    try {
      if (!Number.isInteger(codigoMovimientoInventario) || codigoMovimientoInventario <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigomovimientoinventario   AS "codigoMovimientoInventario",
          codigosucursal               AS "codigoSucursal",
          codigoproducto               AS "codigoProducto",
          codigoproveedor              AS "codigoProveedor",
          codigocolaborador            AS "codigoColaborador",
          fechahoramovimiento          AS "fechaHoraMovimiento",
          tipomovimiento               AS "tipoMovimiento",
          numerodocumento              AS "numeroDocumento",
          lote                         AS "lote",
          fechavencimiento             AS "fechaVencimiento",
          cantidadentrada              AS "cantidadEntrada",
          cantidadsalida               AS "cantidadSalida",
          costounitario                AS "costoUnitario",
          existenciaresultante         AS "existenciaResultante",
          motivomovimiento             AS "motivoMovimiento",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_MovimientosInventario_Buscar($1);
        `,
        [codigoMovimientoInventario],
      );

      return {
        exito: 1,
        mensaje: 'Registro de movimientosinventario encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de movimientosinventario.';
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
  // FUNCIONALIDAD: AGREGAR MOVIMIENTOSINVENTARIO
  // ============================================================
  async agregar(dto: AgregarMovimientosInventarioDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_MovimientosInventario_Agregar(
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
          $11,
          $12,
          $13,
          $14,
          $15,
          $16
        );
        `,
        [
        dto.codigoSucursal,
        dto.codigoProducto,
        dto.codigoProveedor,
        dto.codigoColaborador,
        dto.fechaHoraMovimiento,
        dto.tipoMovimiento,
        dto.numeroDocumento,
        dto.lote,
        dto.fechaVencimiento,
        dto.cantidadEntrada,
        dto.cantidadSalida,
        dto.costoUnitario,
        dto.existenciaResultante,
        dto.motivoMovimiento,
        dto.observaciones,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoMovimientoInventario: fila.codigomovimientoinventario,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de movimientosinventario.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR MOVIMIENTOSINVENTARIO
  // ============================================================
  async editar(codigo: number, dto: EditarMovimientosInventarioDto) {
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
        FROM Usp_MovimientosInventario_Editar(
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
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17
        );
        `,
        [
        codigo,
        dto.codigoSucursal,
        dto.codigoProducto,
        dto.codigoProveedor,
        dto.codigoColaborador,
        dto.fechaHoraMovimiento,
        dto.tipoMovimiento,
        dto.numeroDocumento,
        dto.lote,
        dto.fechaVencimiento,
        dto.cantidadEntrada,
        dto.cantidadSalida,
        dto.costoUnitario,
        dto.existenciaResultante,
        dto.motivoMovimiento,
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
          : 'Error desconocido al editar el registro de movimientosinventario.';
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
  // FUNCIONALIDAD: ELIMINAR MOVIMIENTOSINVENTARIO
  // ============================================================
  async eliminar(codigoMovimientoInventario: number) {
    try {
      if (!Number.isInteger(codigoMovimientoInventario) || codigoMovimientoInventario <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_MovimientosInventario_Eliminar($1);
        `,
        [codigoMovimientoInventario],
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
          : 'Error desconocido al eliminar el registro de movimientosinventario.';
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
