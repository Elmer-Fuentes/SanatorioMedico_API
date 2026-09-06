/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Roles
 * Descripción  : DTO de agregar para Roles.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class AgregarRolesDto {
  @ApiProperty({
    description: 'Campo nombreRol (VARCHAR(80)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(80)
  nombreRol!: string;

  @ApiPropertyOptional({
    description: 'Campo descripcionRol (VARCHAR(250)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  descripcionRol?: string;

  @ApiPropertyOptional({
    description: 'Campo moduloPrincipal (VARCHAR(100)).',
    example: 'Texto de ejemplo',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  moduloPrincipal?: string;

  @ApiProperty({
    description: 'Campo permiteConsultar (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  permiteConsultar!: boolean;

  @ApiProperty({
    description: 'Campo permiteAgregar (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  permiteAgregar!: boolean;

  @ApiProperty({
    description: 'Campo permiteEditar (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  permiteEditar!: boolean;

  @ApiProperty({
    description: 'Campo permiteAnular (BOOLEAN).',
    example: true,
  })
  @IsBoolean()
  permiteAnular!: boolean;

  @ApiProperty({
    description: 'Campo estado (VARCHAR(20)).',
    example: 'Texto de ejemplo',
  })
  @IsString()
  @MaxLength(20)
  estado!: string;
}
