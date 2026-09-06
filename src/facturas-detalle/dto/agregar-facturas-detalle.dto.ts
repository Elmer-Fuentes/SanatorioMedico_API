/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : FacturasDetalle
 * Descripción  : DTO de agregar para FacturasDetalle.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarFacturasDetalleDto {
  @ApiProperty({
    description: 'Campo codigoFactura (INT).',
    example: 1,
  })
  @IsInt()
  codigoFactura!: number;

  @ApiProperty({
    description: 'Campo tipoMovimiento (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  tipoMovimiento!: string;

  @ApiPropertyOptional({
    description: 'Campo tipoCargo (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoCargo?: string;

  @ApiProperty({
    description: 'Campo concepto (VARCHAR(250)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(250)
  concepto!: string;

  @ApiPropertyOptional({
    description: 'Campo cantidad (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @ApiPropertyOptional({
    description: 'Campo precioUnitario (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  precioUnitario?: number;

  @ApiPropertyOptional({
    description: 'Campo subtotal (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @ApiPropertyOptional({
    description: 'Campo montoPago (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsOptional()
  @IsNumber()
  montoPago?: number;

  @ApiPropertyOptional({
    description: 'Campo formaPago (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  formaPago?: string;

  @ApiPropertyOptional({
    description: 'Campo referenciaPago (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  referenciaPago?: string;

  @ApiPropertyOptional({
    description: 'Campo codigoReferenciaOrigen (INT).',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  codigoReferenciaOrigen?: number;

  @ApiProperty({
    description: 'Campo fechaHoraRegistro (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsDateString()
  fechaHoraRegistro!: string;

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
