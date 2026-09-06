/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Facturas
 * Descripción  : DTO de agregar para Facturas.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarFacturasDto {
  @ApiProperty({
    description: 'Campo codigoPaciente (INT).',
    example: 1,
  })
  @IsInt()
  codigoPaciente!: number;

  @ApiProperty({
    description: 'Campo codigoSucursal (INT).',
    example: 1,
  })
  @IsInt()
  codigoSucursal!: number;

  @ApiProperty({
    description: 'Campo codigoColaborador (INT).',
    example: 1,
  })
  @IsInt()
  codigoColaborador!: number;

  @ApiProperty({
    description: 'Campo numeroFactura (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(50)
  numeroFactura!: string;

  @ApiProperty({
    description: 'Campo fechaHoraFactura (TIMESTAMP).',
    example: '2026-09-06T08:00:00',
  })
  @IsDateString()
  fechaHoraFactura!: string;

  @ApiProperty({
    description: 'Campo nombreFacturacion (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(150)
  nombreFacturacion!: string;

  @ApiProperty({
    description: 'Campo nITFacturacion (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  nITFacturacion!: string;

  @ApiPropertyOptional({
    description: 'Campo direccionFacturacion (VARCHAR(200)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccionFacturacion?: string;

  @ApiProperty({
    description: 'Campo subtotal (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  subtotal!: number;

  @ApiProperty({
    description: 'Campo descuento (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  descuento!: number;

  @ApiProperty({
    description: 'Campo impuesto (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  impuesto!: number;

  @ApiProperty({
    description: 'Campo total (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  total!: number;

  @ApiProperty({
    description: 'Campo saldoPendiente (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  saldoPendiente!: number;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  estado!: string;
}
