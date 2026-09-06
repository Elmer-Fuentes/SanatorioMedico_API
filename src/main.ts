/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Bootstrap
 * Descripción  : Punto de entrada de la aplicación NestJS. Configura:
 *                  - Validación global de DTOs (class-validator).
 *                  - Filtro global de excepciones (respuesta uniforme
 *                    { exito, mensaje } en todos los errores).
 *                  - CORS, para que el frontend pueda consumir el API.
 *                  - Documentación Swagger en /api/docs.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============================================================
  // BLOQUE: CORS (permite que el frontend consuma el API)
  // ============================================================
  app.enableCors();

  // ============================================================
  // BLOQUE: VALIDACIÓN GLOBAL DE DTOs
  // whitelist        -> elimina propiedades no declaradas en el DTO
  // forbidNonWhitelisted -> rechaza el request si envían propiedades extra
  // transform        -> convierte los tipos primitivos automáticamente
  // ============================================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ============================================================
  // BLOQUE: FILTRO GLOBAL DE EXCEPCIONES
  // Uniforma TODAS las respuestas de error (incluyendo errores
  // de validación) al formato estándar { exito: 0, mensaje }.
  // ============================================================
  app.useGlobalFilters(new HttpExceptionFilter());

  // ============================================================
  // BLOQUE: DOCUMENTACIÓN SWAGGER
  // Disponible en http://localhost:3000/api/docs
  // ============================================================
  const configSwagger = new DocumentBuilder()
    .setTitle('Sanatorio Médico API')
    .setDescription(
      'API REST del sistema Sanatorio Médico. Expone el CRUD completo ' +
        '(Consultar, Buscar, Agregar, Editar, Eliminar) de cada módulo, ' +
        'consumiendo funciones PL/pgSQL en PostgreSQL.',
    )
    .setVersion('1.0.0')
    .addTag('Sucursales')
    .addTag('Roles')
    .addTag('Colaboradores')
    .addTag('Pacientes')
    .addTag('Especialidades')
    .addTag('ColaboradoresEspecialidades')
    .addTag('Horarios')
    .addTag('CitasConsultas')
    .addTag('CitasConsultasDetalle')
    .addTag('Habitaciones')
    .addTag('Hospitalizaciones')
    .addTag('Productos')
    .addTag('Proveedores')
    .addTag('MovimientosInventario')
    .addTag('Facturas')
    .addTag('FacturasDetalle')
    .build();

  const documentoSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, documentoSwagger);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Sanatorio Médico API corriendo en: http://localhost:${process.env.PORT ?? 3000}/api`);
  console.log(`Documentación Swagger disponible en: http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
await bootstrap();
