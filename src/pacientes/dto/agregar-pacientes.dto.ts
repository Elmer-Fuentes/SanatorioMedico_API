/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Pacientes
 * Descripción  : DTO de agregar para Pacientes.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarPacientesDto {
  @ApiProperty({
    description: 'Campo numeroExpediente (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  numeroExpediente!: string;

  @ApiProperty({
    description: 'Campo tipoDocumento (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  tipoDocumento!: string;

  @ApiProperty({
    description: 'Campo numeroDocumento (VARCHAR(25)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(25)
  numeroDocumento!: string;

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
    description: 'Campo fechaNacimiento (DATE).',
    example: '2026-09-06',
  })
  @IsDateString()
  fechaNacimiento!: string;

  @ApiProperty({
    description: 'Campo genero (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  genero!: string;

  @ApiPropertyOptional({
    description: 'Campo tipoSangre (VARCHAR(10)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  tipoSangre?: string;

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

  @ApiProperty({
    description: 'Campo direccion (VARCHAR(200)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(200)
  direccion!: string;

  @ApiPropertyOptional({
    description: 'Campo contactoEmergencia (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  contactoEmergencia?: string;

  @ApiPropertyOptional({
    description: 'Campo telefonoEmergencia (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefonoEmergencia?: string;

  @ApiPropertyOptional({
    description: 'Campo alergias (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  alergias?: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
