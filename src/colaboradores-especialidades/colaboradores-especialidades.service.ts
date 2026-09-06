/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : ColaboradoresEspecialidades
 * Descripción  : Lógica de negocio del CRUD de ColaboradoresEspecialidades (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarColaboradoresEspecialidadesDto } from './dto/agregar-colaboradores-especialidades.dto.js';
import { EditarColaboradoresEspecialidadesDto } from './dto/editar-colaboradores-especialidades.dto.js';

@Injectable()
export class ColaboradoresEspecialidadesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR COLABORADORESESPECIALIDADES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigocolaboradorespecialidad AS "codigoColaboradorEspecialidad",
          codigocolaborador            AS "codigoColaborador",
          codigoespecialidad           AS "codigoEspecialidad",
          fechaasignacion              AS "fechaAsignacion",
          numeroautorizacion           AS "numeroAutorizacion",
          institucionacreditadora      AS "institucionAcreditadora",
          fechavencimiento             AS "fechaVencimiento",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_ColaboradoresEspecialidades_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'ColaboradoresEspecialidades consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar colaboradoresespecialidades.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR COLABORADORESESPECIALIDADES POR CÓDIGO
  // ============================================================
  async buscar(codigoColaboradorEspecialidad: number) {
    try {
      if (!Number.isInteger(codigoColaboradorEspecialidad) || codigoColaboradorEspecialidad <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigocolaboradorespecialidad AS "codigoColaboradorEspecialidad",
          codigocolaborador            AS "codigoColaborador",
          codigoespecialidad           AS "codigoEspecialidad",
          fechaasignacion              AS "fechaAsignacion",
          numeroautorizacion           AS "numeroAutorizacion",
          institucionacreditadora      AS "institucionAcreditadora",
          fechavencimiento             AS "fechaVencimiento",
          observaciones                AS "observaciones",
          estado                       AS "estado"
        FROM Usp_ColaboradoresEspecialidades_Buscar($1);
        `,
        [codigoColaboradorEspecialidad],
      );

      return {
        exito: 1,
        mensaje: 'Registro de colaboradoresespecialidades encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de colaboradoresespecialidades.';
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
  // FUNCIONALIDAD: AGREGAR COLABORADORESESPECIALIDADES
  // ============================================================
  async agregar(dto: AgregarColaboradoresEspecialidadesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_ColaboradoresEspecialidades_Agregar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        );
        `,
        [
        dto.codigoColaborador,
        dto.codigoEspecialidad,
        dto.fechaAsignacion,
        dto.numeroAutorizacion,
        dto.institucionAcreditadora,
        dto.fechaVencimiento,
        dto.observaciones,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoColaboradorEspecialidad: fila.codigocolaboradorespecialidad,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de colaboradoresespecialidades.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR COLABORADORESESPECIALIDADES
  // ============================================================
  async editar(codigo: number, dto: EditarColaboradoresEspecialidadesDto) {
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
        FROM Usp_ColaboradoresEspecialidades_Editar(
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9
        );
        `,
        [
        codigo,
        dto.codigoColaborador,
        dto.codigoEspecialidad,
        dto.fechaAsignacion,
        dto.numeroAutorizacion,
        dto.institucionAcreditadora,
        dto.fechaVencimiento,
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
          : 'Error desconocido al editar el registro de colaboradoresespecialidades.';
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
  // FUNCIONALIDAD: ELIMINAR COLABORADORESESPECIALIDADES
  // ============================================================
  async eliminar(codigoColaboradorEspecialidad: number) {
    try {
      if (!Number.isInteger(codigoColaboradorEspecialidad) || codigoColaboradorEspecialidad <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_ColaboradoresEspecialidades_Eliminar($1);
        `,
        [codigoColaboradorEspecialidad],
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
          : 'Error desconocido al eliminar el registro de colaboradoresespecialidades.';
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
