/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : MovimientosInventario
 * Descripción  : DTO de editar para MovimientosInventario.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class EditarMovimientosInventarioDto {
  @ApiProperty({
    description: 'Campo codigoSucursal (INT).',
    example: 1,
  })
  @IsInt()
  codigoSucursal!: number;

  @ApiProperty({
    description: 'Campo codigoProducto (INT).',
    example: 1,
  })
  @IsInt()
  codigoProducto!: number;

  @ApiPropertyOptional({
    description: 'Campo codigoProveedor (INT).',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  codigoProveedor?: number;

  @ApiProperty({
    description: 'Campo codigoColaborador (INT).',
    example: 1,
  })
  @IsInt()
  codigoColaborador!: number;

  @ApiProperty({
    description: 'Campo fechaHoraMovimiento (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsDateString()
  fechaHoraMovimiento!: string;

  @ApiProperty({
    description: 'Campo tipoMovimiento (VARCHAR(40)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(40)
  tipoMovimiento!: string;

  @ApiPropertyOptional({
    description: 'Campo numeroDocumento (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  numeroDocumento?: string;

  @ApiPropertyOptional({
    description: 'Campo lote (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lote?: string;

  @ApiPropertyOptional({
    description: 'Campo fechaVencimiento (DATE).',
    example: '2026-09-06',
  })
  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @ApiPropertyOptional({
    description: 'Campo cantidadEntrada (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  cantidadEntrada?: number;

  @ApiPropertyOptional({
    description: 'Campo cantidadSalida (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  cantidadSalida?: number;

  @ApiPropertyOptional({
    description: 'Campo costoUnitario (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  costoUnitario?: number;

  @ApiProperty({
    description: 'Campo existenciaResultante (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  existenciaResultante!: number;

  @ApiPropertyOptional({
    description: 'Campo motivoMovimiento (VARCHAR(250)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  motivoMovimiento?: string;

  @ApiPropertyOptional({
    description: 'Campo observaciones (VARCHAR(500)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  observaciones?: string;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
