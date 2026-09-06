/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Colaboradores
 * Descripción  : Lógica de negocio del CRUD de Colaboradores (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarColaboradoresDto } from './dto/agregar-colaboradores.dto.js';
import { EditarColaboradoresDto } from './dto/editar-colaboradores.dto.js';

@Injectable()
export class ColaboradoresService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR COLABORADORES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigocolaborador            AS "codigoColaborador",
          codigosucursal               AS "codigoSucursal",
          codigorol                    AS "codigoRol",
          nombres                      AS "nombres",
          apellidos                    AS "apellidos",
          dpi                          AS "dpi",
          numerocolegiado              AS "numeroColegiado",
          tipocolaborador              AS "tipoColaborador",
          telefono                     AS "telefono",
          correoelectronico            AS "correoElectronico",
          direccion                    AS "direccion",
          fechacontratacion            AS "fechaContratacion",
          nombreusuario                AS "nombreUsuario",
          claveacceso                  AS "claveAcceso",
          estado                       AS "estado"
        FROM Usp_Colaboradores_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Colaboradores consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar colaboradores.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR COLABORADORES POR CÓDIGO
  // ============================================================
  async buscar(codigoColaborador: number) {
    try {
      if (!Number.isInteger(codigoColaborador) || codigoColaborador <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigocolaborador            AS "codigoColaborador",
          codigosucursal               AS "codigoSucursal",
          codigorol                    AS "codigoRol",
          nombres                      AS "nombres",
          apellidos                    AS "apellidos",
          dpi                          AS "dpi",
          numerocolegiado              AS "numeroColegiado",
          tipocolaborador              AS "tipoColaborador",
          telefono                     AS "telefono",
          correoelectronico            AS "correoElectronico",
          direccion                    AS "direccion",
          fechacontratacion            AS "fechaContratacion",
          nombreusuario                AS "nombreUsuario",
          claveacceso                  AS "claveAcceso",
          estado                       AS "estado"
        FROM Usp_Colaboradores_Buscar($1);
        `,
        [codigoColaborador],
      );

      return {
        exito: 1,
        mensaje: 'Registro de colaboradores encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de colaboradores.';
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
  // FUNCIONALIDAD: AGREGAR COLABORADORES
  // ============================================================
  async agregar(dto: AgregarColaboradoresDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Colaboradores_Agregar(
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
        dto.codigoSucursal,
        dto.codigoRol,
        dto.nombres,
        dto.apellidos,
        dto.dpi,
        dto.numeroColegiado,
        dto.tipoColaborador,
        dto.telefono,
        dto.correoElectronico,
        dto.direccion,
        dto.fechaContratacion,
        dto.nombreUsuario,
        dto.claveAcceso,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoColaborador: fila.codigocolaborador,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de colaboradores.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR COLABORADORES
  // ============================================================
  async editar(codigo: number, dto: EditarColaboradoresDto) {
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
        FROM Usp_Colaboradores_Editar(
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
        dto.codigoSucursal,
        dto.codigoRol,
        dto.nombres,
        dto.apellidos,
        dto.dpi,
        dto.numeroColegiado,
        dto.tipoColaborador,
        dto.telefono,
        dto.correoElectronico,
        dto.direccion,
        dto.fechaContratacion,
        dto.nombreUsuario,
        dto.claveAcceso,
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
          : 'Error desconocido al editar el registro de colaboradores.';
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
  // FUNCIONALIDAD: ELIMINAR COLABORADORES
  // ============================================================
  async eliminar(codigoColaborador: number) {
    try {
      if (!Number.isInteger(codigoColaborador) || codigoColaborador <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Colaboradores_Eliminar($1);
        `,
        [codigoColaborador],
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
          : 'Error desconocido al eliminar el registro de colaboradores.';
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
