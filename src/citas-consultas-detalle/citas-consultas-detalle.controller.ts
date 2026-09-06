/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultasDetalle
 * Descripción  : Endpoints REST del CRUD de CitasConsultasDetalle (documentados con Swagger).
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
import { CitasConsultasDetalleService } from './citas-consultas-detalle.service.js';
import { AgregarCitasConsultasDetalleDto } from './dto/agregar-citas-consultas-detalle.dto.js';
import { EditarCitasConsultasDetalleDto } from './dto/editar-citas-consultas-detalle.dto.js';

@ApiTags('CitasConsultasDetalle')
@Controller('api')
export class CitasConsultasDetalleController {
  constructor(private readonly citasConsultasDetalleService: CitasConsultasDetalleService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE CITASCONSULTASDETALLE
  // ============================================================
  @Get('citasConsultasDetalleConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de CitasConsultasDetalle' })
  @ApiOkResponse({ description: 'Listado de CitasConsultasDetalle obtenido correctamente.' })
  async consultar() {
    return this.citasConsultasDetalleService.consultar();
  }

  // ============================================================
  // GET: BUSCAR CITASCONSULTASDETALLE POR CÓDIGO
  // ============================================================
  @Get('citasConsultasDetalleBuscar/:codigoDetalle')
  @ApiOperation({ summary: 'Buscar un registro de CitasConsultasDetalle por su código' })
  @ApiParam({ name: 'codigoDetalle', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoDetalle', ParseIntPipe)
    codigoDetalle: number,
  ) {
    return this.citasConsultasDetalleService.buscar(codigoDetalle);
  }

  // ============================================================
  // POST: AGREGAR CITASCONSULTASDETALLE
  // ============================================================
  @Post('citasConsultasDetalleAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de CitasConsultasDetalle' })
  @ApiBody({ type: AgregarCitasConsultasDetalleDto })
  async agregar(
    @Body()
    dto: AgregarCitasConsultasDetalleDto,
  ) {
    return this.citasConsultasDetalleService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR CITASCONSULTASDETALLE
  // ============================================================
  @Put('citasConsultasDetalleEditar/:codigoDetalle')
  @ApiOperation({ summary: 'Editar un registro existente de CitasConsultasDetalle' })
  @ApiParam({ name: 'codigoDetalle', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarCitasConsultasDetalleDto })
  async editar(
    @Param('codigoDetalle', ParseIntPipe)
    codigoDetalle: number,
    @Body()
    dto: EditarCitasConsultasDetalleDto,
  ) {
    return this.citasConsultasDetalleService.editar(codigoDetalle, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR CITASCONSULTASDETALLE
  // ============================================================
  @Delete('citasConsultasDetalleEliminar/:codigoDetalle')
  @ApiOperation({ summary: 'Eliminar un registro de CitasConsultasDetalle' })
  @ApiParam({ name: 'codigoDetalle', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoDetalle', ParseIntPipe)
    codigoDetalle: number,
  ) {
    return this.citasConsultasDetalleService.eliminar(codigoDetalle);
  }
}
