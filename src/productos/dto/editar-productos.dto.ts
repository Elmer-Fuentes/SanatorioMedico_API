/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Productos
 * Descripción  : DTO de editar para Productos.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class EditarProductosDto {
  @ApiProperty({
    description: 'Campo codigoInterno (VARCHAR(30)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(30)
  codigoInterno!: string;

  @ApiProperty({
    description: 'Campo nombreProducto (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(150)
  nombreProducto!: string;

  @ApiProperty({
    description: 'Campo tipoProducto (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(50)
  tipoProducto!: string;

  @ApiProperty({
    description: 'Campo categoria (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(100)
  categoria!: string;

  @ApiPropertyOptional({
    description: 'Campo presentacion (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  presentacion?: string;

  @ApiProperty({
    description: 'Campo unidadMedida (VARCHAR(50)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(50)
  unidadMedida!: string;

  @ApiPropertyOptional({
    description: 'Campo principioActivo (VARCHAR(150)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  principioActivo?: string;

  @ApiPropertyOptional({
    description: 'Campo concentracion (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  concentracion?: string;

  @ApiProperty({
    description: 'Campo precioCompra (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  precioCompra!: number;

  @ApiProperty({
    description: 'Campo precioVenta (DECIMAL(12,2)).',
    example: 100.50,
  })
  @IsNumber()
  precioVenta!: number;

  @ApiProperty({
    description: 'Campo requiereReceta (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  requiereReceta!: boolean;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
