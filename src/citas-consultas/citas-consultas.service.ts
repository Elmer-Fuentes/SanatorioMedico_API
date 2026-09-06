/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultas
 * Descripción  : Lógica de negocio del CRUD de CitasConsultas (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarCitasConsultasDto } from './dto/agregar-citas-consultas.dto.js';
import { EditarCitasConsultasDto } from './dto/editar-citas-consultas.dto.js';

@Injectable()
export class CitasConsultasService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR CITASCONSULTAS
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigocitaconsulta           AS "codigoCitaConsulta",
          codigopaciente               AS "codigoPaciente",
          codigocolaborador            AS "codigoColaborador",
          codigosucursal               AS "codigoSucursal",
          codigoespecialidad           AS "codigoEspecialidad",
          fechahoracita                AS "fechaHoraCita",
          tipoatencion                 AS "tipoAtencion",
          motivoconsulta               AS "motivoConsulta",
          sintomas                     AS "sintomas",
          observacionesmedicas         AS "observacionesMedicas",
          tratamientogeneral           AS "tratamientoGeneral",
          presionarterial              AS "presionArterial",
          temperatura                  AS "temperatura",
          peso                         AS "peso",
          estado                       AS "estado"
        FROM Usp_CitasConsultas_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'CitasConsultas consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar citasconsultas.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR CITASCONSULTAS POR CÓDIGO
  // ============================================================
  async buscar(codigoCitaConsulta: number) {
    try {
      if (!Number.isInteger(codigoCitaConsulta) || codigoCitaConsulta <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigocitaconsulta           AS "codigoCitaConsulta",
          codigopaciente               AS "codigoPaciente",
          codigocolaborador            AS "codigoColaborador",
          codigosucursal               AS "codigoSucursal",
          codigoespecialidad           AS "codigoEspecialidad",
          fechahoracita                AS "fechaHoraCita",
          tipoatencion                 AS "tipoAtencion",
          motivoconsulta               AS "motivoConsulta",
          sintomas                     AS "sintomas",
          observacionesmedicas         AS "observacionesMedicas",
          tratamientogeneral           AS "tratamientoGeneral",
          presionarterial              AS "presionArterial",
          temperatura                  AS "temperatura",
          peso                         AS "peso",
          estado                       AS "estado"
        FROM Usp_CitasConsultas_Buscar($1);
        `,
        [codigoCitaConsulta],
      );

      return {
        exito: 1,
        mensaje: 'Registro de citasconsultas encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de citasconsultas.';
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
  // FUNCIONALIDAD: AGREGAR CITASCONSULTAS
  // ============================================================
  async agregar(dto: AgregarCitasConsultasDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_CitasConsultas_Agregar(
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
        dto.codigoColaborador,
        dto.codigoSucursal,
        dto.codigoEspecialidad,
        dto.fechaHoraCita,
        dto.tipoAtencion,
        dto.motivoConsulta,
        dto.sintomas,
        dto.observacionesMedicas,
        dto.tratamientoGeneral,
        dto.presionArterial,
        dto.temperatura,
        dto.peso,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoCitaConsulta: fila.codigocitaconsulta,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de citasconsultas.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR CITASCONSULTAS
  // ============================================================
  async editar(codigo: number, dto: EditarCitasConsultasDto) {
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
        FROM Usp_CitasConsultas_Editar(
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
        dto.codigoColaborador,
        dto.codigoSucursal,
        dto.codigoEspecialidad,
        dto.fechaHoraCita,
        dto.tipoAtencion,
        dto.motivoConsulta,
        dto.sintomas,
        dto.observacionesMedicas,
        dto.tratamientoGeneral,
        dto.presionArterial,
        dto.temperatura,
        dto.peso,
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
          : 'Error desconocido al editar el registro de citasconsultas.';
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
  // FUNCIONALIDAD: ELIMINAR CITASCONSULTAS
  // ============================================================
  async eliminar(codigoCitaConsulta: number) {
    try {
      if (!Number.isInteger(codigoCitaConsulta) || codigoCitaConsulta <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_CitasConsultas_Eliminar($1);
        `,
        [codigoCitaConsulta],
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
          : 'Error desconocido al eliminar el registro de citasconsultas.';
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
