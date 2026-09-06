/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : MovimientosInventario
 * Descripción  : Endpoints REST del CRUD de MovimientosInventario (documentados con Swagger).
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
import { MovimientosInventarioService } from './movimientos-inventario.service.js';
import { AgregarMovimientosInventarioDto } from './dto/agregar-movimientos-inventario.dto.js';
import { EditarMovimientosInventarioDto } from './dto/editar-movimientos-inventario.dto.js';

@ApiTags('MovimientosInventario')
@Controller('api')
export class MovimientosInventarioController {
  constructor(private readonly movimientosInventarioService: MovimientosInventarioService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE MOVIMIENTOSINVENTARIO
  // ============================================================
  @Get('movimientosInventarioConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de MovimientosInventario' })
  @ApiOkResponse({ description: 'Listado de MovimientosInventario obtenido correctamente.' })
  async consultar() {
    return this.movimientosInventarioService.consultar();
  }

  // ============================================================
  // GET: BUSCAR MOVIMIENTOSINVENTARIO POR CÓDIGO
  // ============================================================
  @Get('movimientosInventarioBuscar/:codigoMovimientoInventario')
  @ApiOperation({ summary: 'Buscar un registro de MovimientosInventario por su código' })
  @ApiParam({ name: 'codigoMovimientoInventario', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoMovimientoInventario', ParseIntPipe)
    codigoMovimientoInventario: number,
  ) {
    return this.movimientosInventarioService.buscar(codigoMovimientoInventario);
  }

  // ============================================================
  // POST: AGREGAR MOVIMIENTOSINVENTARIO
  // ============================================================
  @Post('movimientosInventarioAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de MovimientosInventario' })
  @ApiBody({ type: AgregarMovimientosInventarioDto })
  async agregar(
    @Body()
    dto: AgregarMovimientosInventarioDto,
  ) {
    return this.movimientosInventarioService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR MOVIMIENTOSINVENTARIO
  // ============================================================
  @Put('movimientosInventarioEditar/:codigoMovimientoInventario')
  @ApiOperation({ summary: 'Editar un registro existente de MovimientosInventario' })
  @ApiParam({ name: 'codigoMovimientoInventario', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarMovimientosInventarioDto })
  async editar(
    @Param('codigoMovimientoInventario', ParseIntPipe)
    codigoMovimientoInventario: number,
    @Body()
    dto: EditarMovimientosInventarioDto,
  ) {
    return this.movimientosInventarioService.editar(codigoMovimientoInventario, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR MOVIMIENTOSINVENTARIO
  // ============================================================
  @Delete('movimientosInventarioEliminar/:codigoMovimientoInventario')
  @ApiOperation({ summary: 'Eliminar un registro de MovimientosInventario' })
  @ApiParam({ name: 'codigoMovimientoInventario', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoMovimientoInventario', ParseIntPipe)
    codigoMovimientoInventario: number,
  ) {
    return this.movimientosInventarioService.eliminar(codigoMovimientoInventario);
  }
}
