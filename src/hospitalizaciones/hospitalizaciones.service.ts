/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Hospitalizaciones
 * Descripción  : Lógica de negocio del CRUD de Hospitalizaciones (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarHospitalizacionesDto } from './dto/agregar-hospitalizaciones.dto.js';
import { EditarHospitalizacionesDto } from './dto/editar-hospitalizaciones.dto.js';

@Injectable()
export class HospitalizacionesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR HOSPITALIZACIONES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigohospitalizacion        AS "codigoHospitalizacion",
          codigopaciente               AS "codigoPaciente",
          codigosucursal               AS "codigoSucursal",
          codigocolaborador            AS "codigoColaborador",
          codigocitaconsulta           AS "codigoCitaConsulta",
          codigohabitacion             AS "codigoHabitacion",
          fechahoraingreso             AS "fechaHoraIngreso",
          fechahoraegreso              AS "fechaHoraEgreso",
          motivoingreso                AS "motivoIngreso",
          diagnosticoingreso           AS "diagnosticoIngreso",
          diagnosticoegreso            AS "diagnosticoEgreso",
          recomendacionesegreso        AS "recomendacionesEgreso",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_Hospitalizaciones_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Hospitalizaciones consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar hospitalizaciones.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR HOSPITALIZACIONES POR CÓDIGO
  // ============================================================
  async buscar(codigoHospitalizacion: number) {
    try {
      if (!Number.isInteger(codigoHospitalizacion) || codigoHospitalizacion <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigohospitalizacion        AS "codigoHospitalizacion",
          codigopaciente               AS "codigoPaciente",
          codigosucursal               AS "codigoSucursal",
          codigocolaborador            AS "codigoColaborador",
          codigocitaconsulta           AS "codigoCitaConsulta",
          codigohabitacion             AS "codigoHabitacion",
          fechahoraingreso             AS "fechaHoraIngreso",
          fechahoraegreso              AS "fechaHoraEgreso",
          motivoingreso                AS "motivoIngreso",
          diagnosticoingreso           AS "diagnosticoIngreso",
          diagnosticoegreso            AS "diagnosticoEgreso",
          recomendacionesegreso        AS "recomendacionesEgreso",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_Hospitalizaciones_Buscar($1);
        `,
        [codigoHospitalizacion],
      );

      return {
        exito: 1,
        mensaje: 'Registro de hospitalizaciones encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de hospitalizaciones.';
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
  // FUNCIONALIDAD: AGREGAR HOSPITALIZACIONES
  // ============================================================
  async agregar(dto: AgregarHospitalizacionesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Hospitalizaciones_Agregar(
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
        dto.codigoPaciente,
        dto.codigoSucursal,
        dto.codigoColaborador,
        dto.codigoCitaConsulta,
        dto.codigoHabitacion,
        dto.fechaHoraIngreso,
        dto.fechaHoraEgreso,
        dto.motivoIngreso,
        dto.diagnosticoIngreso,
        dto.diagnosticoEgreso,
        dto.recomendacionesEgreso,
        dto.observaciones,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoHospitalizacion: fila.codigohospitalizacion,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de hospitalizaciones.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR HOSPITALIZACIONES
  // ============================================================
  async editar(codigo: number, dto: EditarHospitalizacionesDto) {
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
        FROM Usp_Hospitalizaciones_Editar(
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
        dto.codigoPaciente,
        dto.codigoSucursal,
        dto.codigoColaborador,
        dto.codigoCitaConsulta,
        dto.codigoHabitacion,
        dto.fechaHoraIngreso,
        dto.fechaHoraEgreso,
        dto.motivoIngreso,
        dto.diagnosticoIngreso,
        dto.diagnosticoEgreso,
        dto.recomendacionesEgreso,
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
          : 'Error desconocido al editar el registro de hospitalizaciones.';
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
  // FUNCIONALIDAD: ELIMINAR HOSPITALIZACIONES
  // ============================================================
  async eliminar(codigoHospitalizacion: number) {
    try {
      if (!Number.isInteger(codigoHospitalizacion) || codigoHospitalizacion <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Hospitalizaciones_Eliminar($1);
        `,
        [codigoHospitalizacion],
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
          : 'Error desconocido al eliminar el registro de hospitalizaciones.';
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
