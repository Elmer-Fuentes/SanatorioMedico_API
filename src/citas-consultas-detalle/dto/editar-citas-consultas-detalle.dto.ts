/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultasDetalle
 * Descripción  : DTO de editar para CitasConsultasDetalle.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class EditarCitasConsultasDetalleDto {
  @ApiProperty({
    description: 'Campo codigoCitaConsulta (INT).',
    example: 1,
  })
  @IsInt()
  codigoCitaConsulta!: number;

  @ApiPropertyOptional({
    description: 'Campo codigoProducto (INT).',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  codigoProducto?: number;

  @ApiProperty({
    description: 'Campo tipoDetalle (VARCHAR(40)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(40)
  tipoDetalle!: string;

  @ApiPropertyOptional({
    description: 'Campo subtipoDetalle (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  subtipoDetalle?: string;

  @ApiProperty({
    description: 'Campo descripcionDetalle (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(1000)
  descripcionDetalle!: string;

  @ApiPropertyOptional({
    description: 'Campo dosis (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  dosis?: string;

  @ApiPropertyOptional({
    description: 'Campo frecuencia (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  frecuencia?: string;

  @ApiPropertyOptional({
    description: 'Campo duracion (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  duracion?: string;

  @ApiPropertyOptional({
    description: 'Campo indicaciones (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  indicaciones?: string;

  @ApiPropertyOptional({
    description: 'Campo resultado (VARCHAR(1000)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  resultado?: string;

  @ApiPropertyOptional({
    description: 'Campo cantidad (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @ApiProperty({
    description: 'Campo fechaRegistro (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsDateString()
  fechaRegistro!: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
