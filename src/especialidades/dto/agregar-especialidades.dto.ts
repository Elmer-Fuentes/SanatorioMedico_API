/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Especialidades
 * Descripción  : DTO de agregar para Especialidades.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarEspecialidadesDto {
  @ApiProperty({
    description: 'Campo nombreEspecialidad (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(100)
  nombreEspecialidad!: string;

  @ApiPropertyOptional({
    description: 'Campo descripcion (VARCHAR(250)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Campo areaMedica (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  areaMedica?: string;

  @ApiPropertyOptional({
    description: 'Campo duracionConsulta (INT).',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  duracionConsulta?: number;

  @ApiPropertyOptional({
    description: 'Campo costoConsulta (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  costoConsulta?: number;

  @ApiProperty({
    description: 'Campo requiereCita (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  requiereCita!: boolean;

  @ApiPropertyOptional({
    description: 'Campo observaciones (VARCHAR(250)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  observaciones?: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
