/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : FacturasDetalle
 * Descripción  : Endpoints REST del CRUD de FacturasDetalle (documentados con Swagger).
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
import { FacturasDetalleService } from './facturas-detalle.service.js';
import { AgregarFacturasDetalleDto } from './dto/agregar-facturas-detalle.dto.js';
import { EditarFacturasDetalleDto } from './dto/editar-facturas-detalle.dto.js';

@ApiTags('FacturasDetalle')
@Controller('api')
export class FacturasDetalleController {
  constructor(private readonly facturasDetalleService: FacturasDetalleService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE FACTURASDETALLE
  // ============================================================
  @Get('facturasDetalleConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de FacturasDetalle' })
  @ApiOkResponse({ description: 'Listado de FacturasDetalle obtenido correctamente.' })
  async consultar() {
    return this.facturasDetalleService.consultar();
  }

  // ============================================================
  // GET: BUSCAR FACTURASDETALLE POR CÓDIGO
  // ============================================================
  @Get('facturasDetalleBuscar/:codigoFacturaDetalle')
  @ApiOperation({ summary: 'Buscar un registro de FacturasDetalle por su código' })
  @ApiParam({ name: 'codigoFacturaDetalle', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoFacturaDetalle', ParseIntPipe)
    codigoFacturaDetalle: number,
  ) {
    return this.facturasDetalleService.buscar(codigoFacturaDetalle);
  }

  // ============================================================
  // POST: AGREGAR FACTURASDETALLE
  // ============================================================
  @Post('facturasDetalleAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de FacturasDetalle' })
  @ApiBody({ type: AgregarFacturasDetalleDto })
  async agregar(
    @Body()
    dto: AgregarFacturasDetalleDto,
  ) {
    return this.facturasDetalleService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR FACTURASDETALLE
  // ============================================================
  @Put('facturasDetalleEditar/:codigoFacturaDetalle')
  @ApiOperation({ summary: 'Editar un registro existente de FacturasDetalle' })
  @ApiParam({ name: 'codigoFacturaDetalle', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarFacturasDetalleDto })
  async editar(
    @Param('codigoFacturaDetalle', ParseIntPipe)
    codigoFacturaDetalle: number,
    @Body()
    dto: EditarFacturasDetalleDto,
  ) {
    return this.facturasDetalleService.editar(codigoFacturaDetalle, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR FACTURASDETALLE
  // ============================================================
  @Delete('facturasDetalleEliminar/:codigoFacturaDetalle')
  @ApiOperation({ summary: 'Eliminar un registro de FacturasDetalle' })
  @ApiParam({ name: 'codigoFacturaDetalle', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoFacturaDetalle', ParseIntPipe)
    codigoFacturaDetalle: number,
  ) {
    return this.facturasDetalleService.eliminar(codigoFacturaDetalle);
  }
}
