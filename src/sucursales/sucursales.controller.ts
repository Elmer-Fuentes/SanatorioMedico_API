/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Sucursales
 * Descripción  : Endpoints REST del CRUD de Sucursales (documentados con Swagger).
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SucursalesService } from './sucursales.service.js';
import { AgregarSucursalesDto } from './dto/agregar-sucursales.dto.js';
import { EditarSucursalesDto } from './dto/editar-sucursales.dto.js';

@ApiTags('Sucursales')
@Controller('api')
export class SucursalesController {
  constructor(private readonly sucursalesService: SucursalesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE SUCURSALES
  // ============================================================
  @Get('sucursalesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Sucursales' })
  @ApiOkResponse({ description: 'Listado de Sucursales obtenido correctamente.' })
  async consultar() {
    return this.sucursalesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR SUCURSALES POR CÓDIGO
  // ============================================================
  @Get('sucursalesBuscar/:codigoSucursal')
  @ApiOperation({ summary: 'Buscar un registro de Sucursales por su código' })
  @ApiParam({ name: 'codigoSucursal', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoSucursal', ParseIntPipe)
    codigoSucursal: number,
  ) {
    return this.sucursalesService.buscar(codigoSucursal);
  }

  // ============================================================
  // POST: AGREGAR SUCURSALES
  // ============================================================
  @Post('sucursalesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Sucursales' })
  @ApiBody({ type: AgregarSucursalesDto })
  async agregar(
    @Body()
    dto: AgregarSucursalesDto,
  ) {
    return this.sucursalesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR SUCURSALES
  // ============================================================
  @Put('sucursalesEditar/:codigoSucursal')
  @ApiOperation({ summary: 'Editar un registro existente de Sucursales' })
  @ApiParam({ name: 'codigoSucursal', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarSucursalesDto })
  async editar(
    @Param('codigoSucursal', ParseIntPipe)
    codigoSucursal: number,
    @Body()
    dto: EditarSucursalesDto,
  ) {
    return this.sucursalesService.editar(codigoSucursal, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR SUCURSALES
  // ============================================================
  @Delete('sucursalesEliminar/:codigoSucursal')
  @ApiOperation({ summary: 'Eliminar un registro de Sucursales' })
  @ApiParam({ name: 'codigoSucursal', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoSucursal', ParseIntPipe)
    codigoSucursal: number,
  ) {
    return this.sucursalesService.eliminar(codigoSucursal);
  }
}
