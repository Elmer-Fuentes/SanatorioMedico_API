/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Sucursales
 * Descripción  : DTO de agregar para Sucursales.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsString, Matches, MaxLength } from 'class-validator';

export class AgregarSucursalesDto {
  @ApiProperty({
    description: 'Campo nombreSucursal (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(100)
  nombreSucursal!: string;

  @ApiProperty({
    description: 'Campo direccion (VARCHAR(200)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(200)
  direccion!: string;

  @ApiProperty({
    description: 'Campo fechaApertura (DATE).',
    example: '2026-09-06',
  })
  @IsDateString()
  fechaApertura!: string;

  @ApiProperty({
    description: 'Campo horaApertura (TIME).',
    example: '08:00:00',
  })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
    message: 'La hora debe tener el formato HH:mm o HH:mm:ss.',
  })
  horaApertura!: string;

  @ApiProperty({
    description: 'Campo presupuestoMensual (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  presupuestoMensual!: number;

  @ApiProperty({
    description: 'Campo estado (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  estado!: boolean;
}
