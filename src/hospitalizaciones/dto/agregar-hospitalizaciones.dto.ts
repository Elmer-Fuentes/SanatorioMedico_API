/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Hospitalizaciones
 * Descripción  : DTO de agregar para Hospitalizaciones.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarHospitalizacionesDto {
  @ApiProperty({
    description: 'Campo codigoPaciente (INT).',
    example: 1,
  })
  @IsInt()
  codigoPaciente!: number;

  @ApiProperty({
    description: 'Campo codigoSucursal (INT).',
    example: 1,
  })
  @IsInt()
  codigoSucursal!: number;

  @ApiProperty({
    description: 'Campo codigoColaborador (INT).',
    example: 1,
  })
  @IsInt()
  codigoColaborador!: number;

  @ApiPropertyOptional({
    description: 'Campo codigoCitaConsulta (INT).',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  codigoCitaConsulta?: number;

  @ApiProperty({
    description: 'Campo codigoHabitacion (INT).',
    example: 1,
  })
  @IsInt()
  codigoHabitacion!: number;

  @ApiProperty({
    description: 'Campo fechaHoraIngreso (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsDateString()
  fechaHoraIngreso!: string;

  @ApiPropertyOptional({
    description: 'Campo fechaHoraEgreso (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsOptional()
  @IsDateString()
  fechaHoraEgreso?: string;

  @ApiProperty({
    description: 'Campo motivoIngreso (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(500)
  motivoIngreso!: string;

  @ApiPropertyOptional({
    description: 'Campo diagnosticoIngreso (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  diagnosticoIngreso?: string;

  @ApiPropertyOptional({
    description: 'Campo diagnosticoEgreso (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  diagnosticoEgreso?: string;

  @ApiPropertyOptional({
    description: 'Campo recomendacionesEgreso (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  recomendacionesEgreso?: string;

  @ApiPropertyOptional({
    description: 'Campo observaciones (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  observaciones?: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  estado!: string;
}
