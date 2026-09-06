/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultasDetalle
 * Descripción  : Lógica de negocio del CRUD de CitasConsultasDetalle (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarCitasConsultasDetalleDto } from './dto/agregar-citas-consultas-detalle.dto.js';
import { EditarCitasConsultasDetalleDto } from './dto/editar-citas-consultas-detalle.dto.js';

@Injectable()
export class CitasConsultasDetalleService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR CITASCONSULTASDETALLE
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigodetalle                AS "codigoDetalle",
          codigocitaconsulta           AS "codigoCitaConsulta",
          codigoproducto               AS "codigoProducto",
          tipodetalle                  AS "tipoDetalle",
          subtipodetalle               AS "subtipoDetalle",
          descripciondetalle           AS "descripcionDetalle",
          dosis                        AS "dosis",
          frecuencia                   AS "frecuencia",
          duracion                     AS "duracion",
          indicaciones                 AS "indicaciones",
          resultado                    AS "resultado",
          cantidad                     AS "cantidad",
          fecharegistro                AS "fechaRegistro",
          estado                       AS "estado"
        FROM Usp_CitasConsultasDetalle_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'CitasConsultasDetalle consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar citasconsultasdetalle.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR CITASCONSULTASDETALLE POR CÓDIGO
  // ============================================================
  async buscar(codigoDetalle: number) {
    try {
      if (!Number.isInteger(codigoDetalle) || codigoDetalle <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigodetalle                AS "codigoDetalle",
          codigocitaconsulta           AS "codigoCitaConsulta",
          codigoproducto               AS "codigoProducto",
          tipodetalle                  AS "tipoDetalle",
          subtipodetalle               AS "subtipoDetalle",
          descripciondetalle           AS "descripcionDetalle",
          dosis                        AS "dosis",
          frecuencia                   AS "frecuencia",
          duracion                     AS "duracion",
          indicaciones                 AS "indicaciones",
          resultado                    AS "resultado",
          cantidad                     AS "cantidad",
          fecharegistro                AS "fechaRegistro",
          estado                       AS "estado"
        FROM Usp_CitasConsultasDetalle_Buscar($1);
        `,
        [codigoDetalle],
      );

      return {
        exito: 1,
        mensaje: 'Registro de citasconsultasdetalle encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de citasconsultasdetalle.';
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
  // FUNCIONALIDAD: AGREGAR CITASCONSULTASDETALLE
  // ============================================================
  async agregar(dto: AgregarCitasConsultasDetalleDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_CitasConsultasDetalle_Agregar(
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
        dto.codigoCitaConsulta,
        dto.codigoProducto,
        dto.tipoDetalle,
        dto.subtipoDetalle,
        dto.descripcionDetalle,
        dto.dosis,
        dto.frecuencia,
        dto.duracion,
        dto.indicaciones,
        dto.resultado,
        dto.cantidad,
        dto.fechaRegistro,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoDetalle: fila.codigodetalle,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de citasconsultasdetalle.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR CITASCONSULTASDETALLE
  // ============================================================
  async editar(codigo: number, dto: EditarCitasConsultasDetalleDto) {
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
        FROM Usp_CitasConsultasDetalle_Editar(
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
        codigo,
        dto.codigoCitaConsulta,
        dto.codigoProducto,
        dto.tipoDetalle,
        dto.subtipoDetalle,
        dto.descripcionDetalle,
        dto.dosis,
        dto.frecuencia,
        dto.duracion,
        dto.indicaciones,
        dto.resultado,
        dto.cantidad,
        dto.fechaRegistro,
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
          : 'Error desconocido al editar el registro de citasconsultasdetalle.';
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
  // FUNCIONALIDAD: ELIMINAR CITASCONSULTASDETALLE
  // ============================================================
  async eliminar(codigoDetalle: number) {
    try {
      if (!Number.isInteger(codigoDetalle) || codigoDetalle <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_CitasConsultasDetalle_Eliminar($1);
        `,
        [codigoDetalle],
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
          : 'Error desconocido al eliminar el registro de citasconsultasdetalle.';
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
