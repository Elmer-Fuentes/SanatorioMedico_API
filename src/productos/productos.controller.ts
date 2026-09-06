/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Productos
 * Descripción  : Endpoints REST del CRUD de Productos (documentados con Swagger).
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
import { ProductosService } from './productos.service.js';
import { AgregarProductosDto } from './dto/agregar-productos.dto.js';
import { EditarProductosDto } from './dto/editar-productos.dto.js';

@ApiTags('Productos')
@Controller('api')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE PRODUCTOS
  // ============================================================
  @Get('productosConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Productos' })
  @ApiOkResponse({ description: 'Listado de Productos obtenido correctamente.' })
  async consultar() {
    return this.productosService.consultar();
  }

  // ============================================================
  // GET: BUSCAR PRODUCTOS POR CÓDIGO
  // ============================================================
  @Get('productosBuscar/:codigoProducto')
  @ApiOperation({ summary: 'Buscar un registro de Productos por su código' })
  @ApiParam({ name: 'codigoProducto', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoProducto', ParseIntPipe)
    codigoProducto: number,
  ) {
    return this.productosService.buscar(codigoProducto);
  }

  // ============================================================
  // POST: AGREGAR PRODUCTOS
  // ============================================================
  @Post('productosAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Productos' })
  @ApiBody({ type: AgregarProductosDto })
  async agregar(
    @Body()
    dto: AgregarProductosDto,
  ) {
    return this.productosService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR PRODUCTOS
  // ============================================================
  @Put('productosEditar/:codigoProducto')
  @ApiOperation({ summary: 'Editar un registro existente de Productos' })
  @ApiParam({ name: 'codigoProducto', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarProductosDto })
  async editar(
    @Param('codigoProducto', ParseIntPipe)
    codigoProducto: number,
    @Body()
    dto: EditarProductosDto,
  ) {
    return this.productosService.editar(codigoProducto, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR PRODUCTOS
  // ============================================================
  @Delete('productosEliminar/:codigoProducto')
  @ApiOperation({ summary: 'Eliminar un registro de Productos' })
  @ApiParam({ name: 'codigoProducto', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoProducto', ParseIntPipe)
    codigoProducto: number,
  ) {
    return this.productosService.eliminar(codigoProducto);
  }
}
