/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Horarios
 * Descripción  : DTO de editar para Horarios.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class EditarHorariosDto {
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
    description: 'Campo diaSemana (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  diaSemana!: string;

  @ApiProperty({
    description: 'Campo horaInicio (TIME).',
    example: '08:00:00',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'La hora debe tener el formato HH:mm o HH:mm:ss.',
  })
  horaInicio!: string;

  @ApiProperty({
    description: 'Campo horaFin (TIME).',
    example: '08:00:00',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'La hora debe tener el formato HH:mm o HH:mm:ss.',
  })
  horaFin!: string;

  @ApiProperty({
    description: 'Campo duracionCitaMinutos (INT).',
    example: 1,
  })
  @IsInt()
  duracionCitaMinutos!: number;

  @ApiPropertyOptional({
    description: 'Campo jornada (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  jornada?: string;

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
