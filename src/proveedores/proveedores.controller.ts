/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Proveedores
 * Descripción  : Endpoints REST del CRUD de Proveedores (documentados con Swagger).
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
import { ProveedoresService } from './proveedores.service.js';
import { AgregarProveedoresDto } from './dto/agregar-proveedores.dto.js';
import { EditarProveedoresDto } from './dto/editar-proveedores.dto.js';

@ApiTags('Proveedores')
@Controller('api')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE PROVEEDORES
  // ============================================================
  @Get('proveedoresConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Proveedores' })
  @ApiOkResponse({ description: 'Listado de Proveedores obtenido correctamente.' })
  async consultar() {
    return this.proveedoresService.consultar();
  }

  // ============================================================
  // GET: BUSCAR PROVEEDORES POR CÓDIGO
  // ============================================================
  @Get('proveedoresBuscar/:codigoProveedor')
  @ApiOperation({ summary: 'Buscar un registro de Proveedores por su código' })
  @ApiParam({ name: 'codigoProveedor', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoProveedor', ParseIntPipe)
    codigoProveedor: number,
  ) {
    return this.proveedoresService.buscar(codigoProveedor);
  }

  // ============================================================
  // POST: AGREGAR PROVEEDORES
  // ============================================================
  @Post('proveedoresAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Proveedores' })
  @ApiBody({ type: AgregarProveedoresDto })
  async agregar(
    @Body()
    dto: AgregarProveedoresDto,
  ) {
    return this.proveedoresService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR PROVEEDORES
  // ============================================================
  @Put('proveedoresEditar/:codigoProveedor')
  @ApiOperation({ summary: 'Editar un registro existente de Proveedores' })
  @ApiParam({ name: 'codigoProveedor', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarProveedoresDto })
  async editar(
    @Param('codigoProveedor', ParseIntPipe)
    codigoProveedor: number,
    @Body()
    dto: EditarProveedoresDto,
  ) {
    return this.proveedoresService.editar(codigoProveedor, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR PROVEEDORES
  // ============================================================
  @Delete('proveedoresEliminar/:codigoProveedor')
  @ApiOperation({ summary: 'Eliminar un registro de Proveedores' })
  @ApiParam({ name: 'codigoProveedor', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoProveedor', ParseIntPipe)
    codigoProveedor: number,
  ) {
    return this.proveedoresService.eliminar(codigoProveedor);
  }
}
