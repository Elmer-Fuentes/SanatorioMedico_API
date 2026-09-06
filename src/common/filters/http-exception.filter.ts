/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Common - Filtros
 * Descripción  : Filtro global que uniforma TODAS las respuestas de error
 *                (incluyendo errores de validación de DTOs) al formato
 *                estándar { exito, mensaje } usado en todo el API.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // ============================================================
    // BLOQUE: DETERMINAR CÓDIGO DE ESTADO HTTP
    // ============================================================
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // ============================================================
    // BLOQUE: EXTRAER Y NORMALIZAR EL MENSAJE DE ERROR
    // ============================================================
    let mensaje = 'Ha ocurrido un error inesperado en el servidor.';

    if (exception instanceof HttpException) {
      const cuerpo = exception.getResponse();

      if (typeof cuerpo === 'string') {
        mensaje = cuerpo;
      } else if (cuerpo && typeof cuerpo === 'object') {
        const cuerpoObjeto = cuerpo as Record<string, unknown>;
        if (typeof cuerpoObjeto.mensaje === 'string') {
          mensaje = cuerpoObjeto.mensaje;
        } else if (typeof cuerpoObjeto.message === 'string') {
          mensaje = cuerpoObjeto.message;
        } else if (Array.isArray(cuerpoObjeto.message)) {
          // Errores de validación de class-validator (arreglo de strings)
          mensaje = (cuerpoObjeto.message as string[]).join(' | ');
        }
      }
    } else if (exception instanceof Error) {
      mensaje = exception.message;
    }

    // ============================================================
    // BLOQUE: RESPUESTA UNIFORME DEL API
    // ============================================================
    response.status(status).json({
      exito: 0,
      mensaje,
    });
  }
}
