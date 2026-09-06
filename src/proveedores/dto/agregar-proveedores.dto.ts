/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Proveedores
 * Descripción  : DTO de agregar para Proveedores.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarProveedoresDto {
  @ApiProperty({
    description: 'Campo nit (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  nit!: string;

  @ApiProperty({
    description: 'Campo razonSocial (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(150)
  razonSocial!: string;

  @ApiPropertyOptional({
    description: 'Campo nombreComercial (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombreComercial?: string;

  @ApiProperty({
    description: 'Campo direccion (VARCHAR(200)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(200)
  direccion!: string;

  @ApiPropertyOptional({
    description: 'Campo municipio (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  municipio?: string;

  @ApiPropertyOptional({
    description: 'Campo departamento (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  departamento?: string;

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
    description: 'Campo personaContacto (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  personaContacto?: string;

  @ApiPropertyOptional({
    description: 'Campo telefonoContacto (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefonoContacto?: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
