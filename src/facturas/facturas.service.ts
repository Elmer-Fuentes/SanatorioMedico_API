/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Facturas
 * Descripción  : Lógica de negocio del CRUD de Facturas (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarFacturasDto } from './dto/agregar-facturas.dto.js';
import { EditarFacturasDto } from './dto/editar-facturas.dto.js';

@Injectable()
export class FacturasService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR FACTURAS
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigofactura                AS "codigoFactura",
          codigopaciente               AS "codigoPaciente",
          codigosucursal               AS "codigoSucursal",
          codigocolaborador            AS "codigoColaborador",
          numerofactura                AS "numeroFactura",
          fechahorafactura             AS "fechaHoraFactura",
          nombrefacturacion            AS "nombreFacturacion",
          nitfacturacion               AS "nITFacturacion",
          direccionfacturacion         AS "direccionFacturacion",
          subtotal                     AS "subtotal",
          descuento                    AS "descuento",
          impuesto                     AS "impuesto",
          total                        AS "total",
          saldopendiente               AS "saldoPendiente",
          estado                       AS "estado"
        FROM Usp_Facturas_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Facturas consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar facturas.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR FACTURAS POR CÓDIGO
  // ============================================================
  async buscar(codigoFactura: number) {
    try {
      if (!Number.isInteger(codigoFactura) || codigoFactura <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigofactura                AS "codigoFactura",
          codigopaciente               AS "codigoPaciente",
          codigosucursal               AS "codigoSucursal",
          codigocolaborador            AS "codigoColaborador",
          numerofactura                AS "numeroFactura",
          fechahorafactura             AS "fechaHoraFactura",
          nombrefacturacion            AS "nombreFacturacion",
          nitfacturacion               AS "nITFacturacion",
          direccionfacturacion         AS "direccionFacturacion",
          subtotal                     AS "subtotal",
          descuento                    AS "descuento",
          impuesto                     AS "impuesto",
          total                        AS "total",
          saldopendiente               AS "saldoPendiente",
          estado                       AS "estado"
        FROM Usp_Facturas_Buscar($1);
        `,
        [codigoFactura],
      );

      return {
        exito: 1,
        mensaje: 'Registro de facturas encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de facturas.';
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
  // FUNCIONALIDAD: AGREGAR FACTURAS
  // ============================================================
  async agregar(dto: AgregarFacturasDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Facturas_Agregar(
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
          $14
        );
        `,
        [
        dto.codigoPaciente,
        dto.codigoSucursal,
        dto.codigoColaborador,
        dto.numeroFactura,
        dto.fechaHoraFactura,
        dto.nombreFacturacion,
        dto.nITFacturacion,
        dto.direccionFacturacion,
        dto.subtotal,
        dto.descuento,
        dto.impuesto,
        dto.total,
        dto.saldoPendiente,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoFactura: fila.codigofactura,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de facturas.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR FACTURAS
  // ============================================================
  async editar(codigo: number, dto: EditarFacturasDto) {
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
        FROM Usp_Facturas_Editar(
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
          $15
        );
        `,
        [
        codigo,
        dto.codigoPaciente,
        dto.codigoSucursal,
        dto.codigoColaborador,
        dto.numeroFactura,
        dto.fechaHoraFactura,
        dto.nombreFacturacion,
        dto.nITFacturacion,
        dto.direccionFacturacion,
        dto.subtotal,
        dto.descuento,
        dto.impuesto,
        dto.total,
        dto.saldoPendiente,
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
          : 'Error desconocido al editar el registro de facturas.';
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
  // FUNCIONALIDAD: ELIMINAR FACTURAS
  // ============================================================
  async eliminar(codigoFactura: number) {
    try {
      if (!Number.isInteger(codigoFactura) || codigoFactura <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Facturas_Eliminar($1);
        `,
        [codigoFactura],
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
          : 'Error desconocido al eliminar el registro de facturas.';
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
