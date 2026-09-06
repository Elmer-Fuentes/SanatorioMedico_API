/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : FacturasDetalle
 * Descripción  : Lógica de negocio del CRUD de FacturasDetalle (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarFacturasDetalleDto } from './dto/agregar-facturas-detalle.dto.js';
import { EditarFacturasDetalleDto } from './dto/editar-facturas-detalle.dto.js';

@Injectable()
export class FacturasDetalleService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR FACTURASDETALLE
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigofacturadetalle         AS "codigoFacturaDetalle",
          codigofactura                AS "codigoFactura",
          tipomovimiento               AS "tipoMovimiento",
          tipocargo                    AS "tipoCargo",
          concepto                     AS "concepto",
          cantidad                     AS "cantidad",
          preciounitario               AS "precioUnitario",
          subtotal                     AS "subtotal",
          montopago                    AS "montoPago",
          formapago                    AS "formaPago",
          referenciapago               AS "referenciaPago",
          codigoreferenciaorigen       AS "codigoReferenciaOrigen",
          fechahoraregistro            AS "fechaHoraRegistro",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_FacturasDetalle_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'FacturasDetalle consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar facturasdetalle.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR FACTURASDETALLE POR CÓDIGO
  // ============================================================
  async buscar(codigoFacturaDetalle: number) {
    try {
      if (!Number.isInteger(codigoFacturaDetalle) || codigoFacturaDetalle <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigofacturadetalle         AS "codigoFacturaDetalle",
          codigofactura                AS "codigoFactura",
          tipomovimiento               AS "tipoMovimiento",
          tipocargo                    AS "tipoCargo",
          concepto                     AS "concepto",
          cantidad                     AS "cantidad",
          preciounitario               AS "precioUnitario",
          subtotal                     AS "subtotal",
          montopago                    AS "montoPago",
          formapago                    AS "formaPago",
          referenciapago               AS "referenciaPago",
          codigoreferenciaorigen       AS "codigoReferenciaOrigen",
          fechahoraregistro            AS "fechaHoraRegistro",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_FacturasDetalle_Buscar($1);
        `,
        [codigoFacturaDetalle],
      );

      return {
        exito: 1,
        mensaje: 'Registro de facturasdetalle encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de facturasdetalle.';
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
  // FUNCIONALIDAD: AGREGAR FACTURASDETALLE
  // ============================================================
  async agregar(dto: AgregarFacturasDetalleDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_FacturasDetalle_Agregar(
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
        dto.codigoFactura,
        dto.tipoMovimiento,
        dto.tipoCargo,
        dto.concepto,
        dto.cantidad,
        dto.precioUnitario,
        dto.subtotal,
        dto.montoPago,
        dto.formaPago,
        dto.referenciaPago,
        dto.codigoReferenciaOrigen,
        dto.fechaHoraRegistro,
        dto.observaciones,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoFacturaDetalle: fila.codigofacturadetalle,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de facturasdetalle.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR FACTURASDETALLE
  // ============================================================
  async editar(codigo: number, dto: EditarFacturasDetalleDto) {
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
        FROM Usp_FacturasDetalle_Editar(
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
        dto.codigoFactura,
        dto.tipoMovimiento,
        dto.tipoCargo,
        dto.concepto,
        dto.cantidad,
        dto.precioUnitario,
        dto.subtotal,
        dto.montoPago,
        dto.formaPago,
        dto.referenciaPago,
        dto.codigoReferenciaOrigen,
        dto.fechaHoraRegistro,
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
          : 'Error desconocido al editar el registro de facturasdetalle.';
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
  // FUNCIONALIDAD: ELIMINAR FACTURASDETALLE
  // ============================================================
  async eliminar(codigoFacturaDetalle: number) {
    try {
      if (!Number.isInteger(codigoFacturaDetalle) || codigoFacturaDetalle <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_FacturasDetalle_Eliminar($1);
        `,
        [codigoFacturaDetalle],
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
          : 'Error desconocido al eliminar el registro de facturasdetalle.';
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
