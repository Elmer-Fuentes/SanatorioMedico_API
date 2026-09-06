/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Colaboradores
 * Descripción  : DTO de editar para Colaboradores.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class EditarColaboradoresDto {
  @ApiProperty({
    description: 'Campo codigoSucursal (INT).',
    example: 1,
  })
  @IsInt()
  codigoSucursal!: number;

  @ApiProperty({
    description: 'Campo codigoRol (INT).',
    example: 1,
  })
  @IsInt()
  codigoRol!: number;

  @ApiProperty({
    description: 'Campo nombres (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(100)
  nombres!: string;

  @ApiProperty({
    description: 'Campo apellidos (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(100)
  apellidos!: string;

  @ApiProperty({
    description: 'Campo dpi (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  dpi!: string;

  @ApiPropertyOptional({
    description: 'Campo numeroColegiado (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  numeroColegiado?: string;

  @ApiProperty({
    description: 'Campo tipoColaborador (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(50)
  tipoColaborador!: string;

  @ApiProperty({
    description: 'Campo telefono (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  telefono!: string;

  @ApiPropertyOptional({
    description: 'Campo correoElectronico (VARCHAR(120)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  correoElectronico?: string;

  @ApiPropertyOptional({
    description: 'Campo direccion (VARCHAR(200)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;

  @ApiProperty({
    description: 'Campo fechaContratacion (DATE).',
    example: '2026-09-06',
  })
  @IsDateString()
  fechaContratacion!: string;

  @ApiProperty({
    description: 'Campo nombreUsuario (VARCHAR(80)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(80)
  nombreUsuario!: string;

  @ApiProperty({
    description: 'Campo claveAcceso (VARCHAR(255)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(255)
  claveAcceso!: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
