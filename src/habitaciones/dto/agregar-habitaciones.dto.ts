/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Habitaciones
 * Descripción  : DTO de agregar para Habitaciones.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarHabitacionesDto {
  @ApiProperty({
    description: 'Campo codigoSucursal (INT).',
    example: 1,
  })
  @IsInt()
  codigoSucursal!: number;

  @ApiProperty({
    description: 'Campo numeroHabitacion (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  numeroHabitacion!: string;

  @ApiProperty({
    description: 'Campo codigoCama (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  codigoCama!: string;

  @ApiProperty({
    description: 'Campo tipoHabitacion (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(50)
  tipoHabitacion!: string;

  @ApiPropertyOptional({
    description: 'Campo piso (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  piso?: string;

  @ApiProperty({
    description: 'Campo capacidad (INT).',
    example: 1,
  })
  @IsInt()
  capacidad!: number;

  @ApiProperty({
    description: 'Campo tarifaDiaria (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  tarifaDiaria!: number;

  @ApiPropertyOptional({
    description: 'Campo descripcion (VARCHAR(250)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  descripcion?: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  estado!: string;
}
