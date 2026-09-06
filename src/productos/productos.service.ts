/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Productos
 * Descripción  : Lógica de negocio del CRUD de Productos (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarProductosDto } from './dto/agregar-productos.dto.js';
import { EditarProductosDto } from './dto/editar-productos.dto.js';

@Injectable()
export class ProductosService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR PRODUCTOS
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigoproducto               AS "codigoProducto",
          codigointerno                AS "codigoInterno",
          nombreproducto               AS "nombreProducto",
          tipoproducto                 AS "tipoProducto",
          categoria                    AS "categoria",
          presentacion                 AS "presentacion",
          unidadmedida                 AS "unidadMedida",
          principioactivo              AS "principioActivo",
          concentracion                AS "concentracion",
          preciocompra                 AS "precioCompra",
          precioventa                  AS "precioVenta",
          requierereceta               AS "requiereReceta",
          estado                       AS "estado"
        FROM Usp_Productos_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Productos consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar productos.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR PRODUCTOS POR CÓDIGO
  // ============================================================
  async buscar(codigoProducto: number) {
    try {
      if (!Number.isInteger(codigoProducto) || codigoProducto <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigoproducto               AS "codigoProducto",
          codigointerno                AS "codigoInterno",
          nombreproducto               AS "nombreProducto",
          tipoproducto                 AS "tipoProducto",
          categoria                    AS "categoria",
          presentacion                 AS "presentacion",
          unidadmedida                 AS "unidadMedida",
          principioactivo              AS "principioActivo",
          concentracion                AS "concentracion",
          preciocompra                 AS "precioCompra",
          precioventa                  AS "precioVenta",
          requierereceta               AS "requiereReceta",
          estado                       AS "estado"
        FROM Usp_Productos_Buscar($1);
        `,
        [codigoProducto],
      );

      return {
        exito: 1,
        mensaje: 'Registro de productos encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de productos.';
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
  // FUNCIONALIDAD: AGREGAR PRODUCTOS
  // ============================================================
  async agregar(dto: AgregarProductosDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Productos_Agregar(
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
          $12
        );
        `,
        [
        dto.codigoInterno,
        dto.nombreProducto,
        dto.tipoProducto,
        dto.categoria,
        dto.presentacion,
        dto.unidadMedida,
        dto.principioActivo,
        dto.concentracion,
        dto.precioCompra,
        dto.precioVenta,
        dto.requiereReceta,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoProducto: fila.codigoproducto,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de productos.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR PRODUCTOS
  // ============================================================
  async editar(codigo: number, dto: EditarProductosDto) {
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
        FROM Usp_Productos_Editar(
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
          $13
        );
        `,
        [
        codigo,
        dto.codigoInterno,
        dto.nombreProducto,
        dto.tipoProducto,
        dto.categoria,
        dto.presentacion,
        dto.unidadMedida,
        dto.principioActivo,
        dto.concentracion,
        dto.precioCompra,
        dto.precioVenta,
        dto.requiereReceta,
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
          : 'Error desconocido al editar el registro de productos.';
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
  // FUNCIONALIDAD: ELIMINAR PRODUCTOS
  // ============================================================
  async eliminar(codigoProducto: number) {
    try {
      if (!Number.isInteger(codigoProducto) || codigoProducto <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Productos_Eliminar($1);
        `,
        [codigoProducto],
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
          : 'Error desconocido al eliminar el registro de productos.';
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
