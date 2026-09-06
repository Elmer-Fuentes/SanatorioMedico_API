/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : ColaboradoresEspecialidades
 * Descripción  : DTO de agregar para ColaboradoresEspecialidades.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarColaboradoresEspecialidadesDto {
  @ApiProperty({
    description: 'Campo codigoColaborador (INT).',
    example: 1,
  })
  @IsInt()
  codigoColaborador!: number;

  @ApiProperty({
    description: 'Campo codigoEspecialidad (INT).',
    example: 1,
  })
  @IsInt()
  codigoEspecialidad!: number;

  @ApiProperty({
    description: 'Campo fechaAsignacion (DATE).',
    example: '2026-09-06',
  })
  @IsDateString()
  fechaAsignacion!: string;

  @ApiPropertyOptional({
    description: 'Campo numeroAutorizacion (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  numeroAutorizacion?: string;

  @ApiPropertyOptional({
    description: 'Campo institucionAcreditadora (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  institucionAcreditadora?: string;

  @ApiPropertyOptional({
    description: 'Campo fechaVencimiento (DATE).',
    example: '2026-09-06',
  })
  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

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
