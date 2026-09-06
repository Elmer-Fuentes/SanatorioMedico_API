/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Facturas
 * Descripción  : Endpoints REST del CRUD de Facturas (documentados con Swagger).
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
import { FacturasService } from './facturas.service.js';
import { AgregarFacturasDto } from './dto/agregar-facturas.dto.js';
import { EditarFacturasDto } from './dto/editar-facturas.dto.js';

@ApiTags('Facturas')
@Controller('api')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE FACTURAS
  // ============================================================
  @Get('facturasConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Facturas' })
  @ApiOkResponse({ description: 'Listado de Facturas obtenido correctamente.' })
  async consultar() {
    return this.facturasService.consultar();
  }

  // ============================================================
  // GET: BUSCAR FACTURAS POR CÓDIGO
  // ============================================================
  @Get('facturasBuscar/:codigoFactura')
  @ApiOperation({ summary: 'Buscar un registro de Facturas por su código' })
  @ApiParam({ name: 'codigoFactura', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoFactura', ParseIntPipe)
    codigoFactura: number,
  ) {
    return this.facturasService.buscar(codigoFactura);
  }

  // ============================================================
  // POST: AGREGAR FACTURAS
  // ============================================================
  @Post('facturasAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Facturas' })
  @ApiBody({ type: AgregarFacturasDto })
  async agregar(
    @Body()
    dto: AgregarFacturasDto,
  ) {
    return this.facturasService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR FACTURAS
  // ============================================================
  @Put('facturasEditar/:codigoFactura')
  @ApiOperation({ summary: 'Editar un registro existente de Facturas' })
  @ApiParam({ name: 'codigoFactura', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarFacturasDto })
  async editar(
    @Param('codigoFactura', ParseIntPipe)
    codigoFactura: number,
    @Body()
    dto: EditarFacturasDto,
  ) {
    return this.facturasService.editar(codigoFactura, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR FACTURAS
  // ============================================================
  @Delete('facturasEliminar/:codigoFactura')
  @ApiOperation({ summary: 'Eliminar un registro de Facturas' })
  @ApiParam({ name: 'codigoFactura', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoFactura', ParseIntPipe)
    codigoFactura: number,
  ) {
    return this.facturasService.eliminar(codigoFactura);
  }
}
