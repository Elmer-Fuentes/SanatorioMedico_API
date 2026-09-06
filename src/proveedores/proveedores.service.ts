/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Proveedores
 * Descripción  : Lógica de negocio del CRUD de Proveedores (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarProveedoresDto } from './dto/agregar-proveedores.dto.js';
import { EditarProveedoresDto } from './dto/editar-proveedores.dto.js';

@Injectable()
export class ProveedoresService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR PROVEEDORES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigoproveedor              AS "codigoProveedor",
          nit                          AS "nit",
          razonsocial                  AS "razonSocial",
          nombrecomercial              AS "nombreComercial",
          direccion                    AS "direccion",
          municipio                    AS "municipio",
          departamento                 AS "departamento",
          telefono                     AS "telefono",
          correoelectronico            AS "correoElectronico",
          personacontacto              AS "personaContacto",
          telefonocontacto             AS "telefonoContacto",
          estado                       AS "estado"
        FROM Usp_Proveedores_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Proveedores consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar proveedores.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR PROVEEDORES POR CÓDIGO
  // ============================================================
  async buscar(codigoProveedor: number) {
    try {
      if (!Number.isInteger(codigoProveedor) || codigoProveedor <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigoproveedor              AS "codigoProveedor",
          nit                          AS "nit",
          razonsocial                  AS "razonSocial",
          nombrecomercial              AS "nombreComercial",
          direccion                    AS "direccion",
          municipio                    AS "municipio",
          departamento                 AS "departamento",
          telefono                     AS "telefono",
          correoelectronico            AS "correoElectronico",
          personacontacto              AS "personaContacto",
          telefonocontacto             AS "telefonoContacto",
          estado                       AS "estado"
        FROM Usp_Proveedores_Buscar($1);
        `,
        [codigoProveedor],
      );

      return {
        exito: 1,
        mensaje: 'Registro de proveedores encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de proveedores.';
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
  // FUNCIONALIDAD: AGREGAR PROVEEDORES
  // ============================================================
  async agregar(dto: AgregarProveedoresDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Proveedores_Agregar(
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
        dto.nit,
        dto.razonSocial,
        dto.nombreComercial,
        dto.direccion,
        dto.municipio,
        dto.departamento,
        dto.telefono,
        dto.correoElectronico,
        dto.personaContacto,
        dto.telefonoContacto,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoProveedor: fila.codigoproveedor,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de proveedores.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR PROVEEDORES
  // ============================================================
  async editar(codigo: number, dto: EditarProveedoresDto) {
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
        FROM Usp_Proveedores_Editar(
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
        codigo,
        dto.nit,
        dto.razonSocial,
        dto.nombreComercial,
        dto.direccion,
        dto.municipio,
        dto.departamento,
        dto.telefono,
        dto.correoElectronico,
        dto.personaContacto,
        dto.telefonoContacto,
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
          : 'Error desconocido al editar el registro de proveedores.';
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
  // FUNCIONALIDAD: ELIMINAR PROVEEDORES
  // ============================================================
  async eliminar(codigoProveedor: number) {
    try {
      if (!Number.isInteger(codigoProveedor) || codigoProveedor <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Proveedores_Eliminar($1);
        `,
        [codigoProveedor],
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
          : 'Error desconocido al eliminar el registro de proveedores.';
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
