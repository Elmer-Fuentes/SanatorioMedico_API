/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultas
 * Descripción  : DTO de agregar para CitasConsultas.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarCitasConsultasDto {
  @ApiProperty({
    description: 'Campo codigoPaciente (INT).',
    example: 1,
  })
  @IsInt()
  codigoPaciente!: number;

  @ApiProperty({
    description: 'Campo codigoColaborador (INT).',
    example: 1,
  })
  @IsInt()
  codigoColaborador!: number;

  @ApiProperty({
    description: 'Campo codigoSucursal (INT).',
    example: 1,
  })
  @IsInt()
  codigoSucursal!: number;

  @ApiProperty({
    description: 'Campo codigoEspecialidad (INT).',
    example: 1,
  })
  @IsInt()
  codigoEspecialidad!: number;

  @ApiProperty({
    description: 'Campo fechaHoraCita (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsDateString()
  fechaHoraCita!: string;

  @ApiProperty({
    description: 'Campo tipoAtencion (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  tipoAtencion!: string;

  @ApiProperty({
    description: 'Campo motivoConsulta (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(500)
  motivoConsulta!: string;

  @ApiPropertyOptional({
    description: 'Campo sintomas (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  sintomas?: string;

  @ApiPropertyOptional({
    description: 'Campo observacionesMedicas (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observacionesMedicas?: string;

  @ApiPropertyOptional({
    description: 'Campo tratamientoGeneral (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  tratamientoGeneral?: string;

  @ApiPropertyOptional({
    description: 'Campo presionArterial (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  presionArterial?: string;

  @ApiPropertyOptional({
    description: 'Campo temperatura (DECIMAL(5,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  temperatura?: number;

  @ApiPropertyOptional({
    description: 'Campo peso (DECIMAL(6,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  peso?: number;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  estado!: string;
}
