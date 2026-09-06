/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Pacientes
 * Descripción  : Lógica de negocio del CRUD de Pacientes (Consultar, Buscar, Agregar, Editar, Eliminar).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { AgregarPacientesDto } from './dto/agregar-pacientes.dto.js';
import { EditarPacientesDto } from './dto/editar-pacientes.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ============================================================
  // FUNCIONALIDAD: CONSULTAR PACIENTES
  // ============================================================
  async consultar() {
    try {
      const resultado = await this.databaseService.query(`
        SELECT
          codigopaciente               AS "codigoPaciente",
          numeroexpediente             AS "numeroExpediente",
          tipodocumento                AS "tipoDocumento",
          numerodocumento              AS "numeroDocumento",
          nombres                      AS "nombres",
          apellidos                    AS "apellidos",
          fechanacimiento              AS "fechaNacimiento",
          genero                       AS "genero",
          tiposangre                   AS "tipoSangre",
          telefono                     AS "telefono",
          correoelectronico            AS "correoElectronico",
          direccion                    AS "direccion",
          contactoemergencia           AS "contactoEmergencia",
          telefonoemergencia           AS "telefonoEmergencia",
          alergias                     AS "alergias",
          estado                       AS "estado"
        FROM Usp_Pacientes_Consultar();
      `);

      return {
        exito: 1,
        mensaje: 'Pacientes consultados correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al consultar pacientes.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: BUSCAR PACIENTES POR CÓDIGO
  // ============================================================
  async buscar(codigoPaciente: number) {
    try {
      if (!Number.isInteger(codigoPaciente) || codigoPaciente <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT
          codigopaciente               AS "codigoPaciente",
          numeroexpediente             AS "numeroExpediente",
          tipodocumento                AS "tipoDocumento",
          numerodocumento              AS "numeroDocumento",
          nombres                      AS "nombres",
          apellidos                    AS "apellidos",
          fechanacimiento              AS "fechaNacimiento",
          genero                       AS "genero",
          tiposangre                   AS "tipoSangre",
          telefono                     AS "telefono",
          correoelectronico            AS "correoElectronico",
          direccion                    AS "direccion",
          contactoemergencia           AS "contactoEmergencia",
          telefonoemergencia           AS "telefonoEmergencia",
          alergias                     AS "alergias",
          estado                       AS "estado"
        FROM Usp_Pacientes_Buscar($1);
        `,
        [codigoPaciente],
      );

      return {
        exito: 1,
        mensaje: 'Registro de pacientes encontrado correctamente.',
        datos: resultado.rows,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const mensajeCompleto =
        error instanceof Error
          ? error.message
          : 'Error desconocido al buscar el registro de pacientes.';
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
  // FUNCIONALIDAD: AGREGAR PACIENTES
  // ============================================================
  async agregar(dto: AgregarPacientesDto) {
    try {
      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Pacientes_Agregar(
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
        dto.numeroExpediente,
        dto.tipoDocumento,
        dto.numeroDocumento,
        dto.nombres,
        dto.apellidos,
        dto.fechaNacimiento,
        dto.genero,
        dto.tipoSangre,
        dto.telefono,
        dto.correoElectronico,
        dto.direccion,
        dto.contactoEmergencia,
        dto.telefonoEmergencia,
        dto.alergias,
        dto.estado
        ],
      );

      const fila = resultado.rows[0];

      return {
        exito: fila.exito,
        mensaje: fila.mensaje,
        codigoPaciente: fila.codigopaciente,
      };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : 'Error desconocido al agregar el registro de pacientes.';
      throw new InternalServerErrorException({
        exito: 0,
        mensaje: mensaje,
      });
    }
  }

  // ============================================================
  // FUNCIONALIDAD: EDITAR PACIENTES
  // ============================================================
  async editar(codigo: number, dto: EditarPacientesDto) {
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
        FROM Usp_Pacientes_Editar(
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
        codigo,
        dto.numeroExpediente,
        dto.tipoDocumento,
        dto.numeroDocumento,
        dto.nombres,
        dto.apellidos,
        dto.fechaNacimiento,
        dto.genero,
        dto.tipoSangre,
        dto.telefono,
        dto.correoElectronico,
        dto.direccion,
        dto.contactoEmergencia,
        dto.telefonoEmergencia,
        dto.alergias,
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
          : 'Error desconocido al editar el registro de pacientes.';
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
  // FUNCIONALIDAD: ELIMINAR PACIENTES
  // ============================================================
  async eliminar(codigoPaciente: number) {
    try {
      if (!Number.isInteger(codigoPaciente) || codigoPaciente <= 0) {
        throw new BadRequestException({
          exito: 0,
          mensaje: 'El código debe ser un número entero mayor que cero.',
        });
      }

      const resultado = await this.databaseService.query(
        `
        SELECT *
        FROM Usp_Pacientes_Eliminar($1);
        `,
        [codigoPaciente],
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
          : 'Error desconocido al eliminar el registro de pacientes.';
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
