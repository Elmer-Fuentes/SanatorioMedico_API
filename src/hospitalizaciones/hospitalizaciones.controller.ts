/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Hospitalizaciones
 * Descripción  : Endpoints REST del CRUD de Hospitalizaciones (documentados con Swagger).
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
import { HospitalizacionesService } from './hospitalizaciones.service.js';
import { AgregarHospitalizacionesDto } from './dto/agregar-hospitalizaciones.dto.js';
import { EditarHospitalizacionesDto } from './dto/editar-hospitalizaciones.dto.js';

@ApiTags('Hospitalizaciones')
@Controller('api')
export class HospitalizacionesController {
  constructor(private readonly hospitalizacionesService: HospitalizacionesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE HOSPITALIZACIONES
  // ============================================================
  @Get('hospitalizacionesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Hospitalizaciones' })
  @ApiOkResponse({ description: 'Listado de Hospitalizaciones obtenido correctamente.' })
  async consultar() {
    return this.hospitalizacionesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR HOSPITALIZACIONES POR CÓDIGO
  // ============================================================
  @Get('hospitalizacionesBuscar/:codigoHospitalizacion')
  @ApiOperation({ summary: 'Buscar un registro de Hospitalizaciones por su código' })
  @ApiParam({ name: 'codigoHospitalizacion', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoHospitalizacion', ParseIntPipe)
    codigoHospitalizacion: number,
  ) {
    return this.hospitalizacionesService.buscar(codigoHospitalizacion);
  }

  // ============================================================
  // POST: AGREGAR HOSPITALIZACIONES
  // ============================================================
  @Post('hospitalizacionesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Hospitalizaciones' })
  @ApiBody({ type: AgregarHospitalizacionesDto })
  async agregar(
    @Body()
    dto: AgregarHospitalizacionesDto,
  ) {
    return this.hospitalizacionesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR HOSPITALIZACIONES
  // ============================================================
  @Put('hospitalizacionesEditar/:codigoHospitalizacion')
  @ApiOperation({ summary: 'Editar un registro existente de Hospitalizaciones' })
  @ApiParam({ name: 'codigoHospitalizacion', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarHospitalizacionesDto })
  async editar(
    @Param('codigoHospitalizacion', ParseIntPipe)
    codigoHospitalizacion: number,
    @Body()
    dto: EditarHospitalizacionesDto,
  ) {
    return this.hospitalizacionesService.editar(codigoHospitalizacion, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR HOSPITALIZACIONES
  // ============================================================
  @Delete('hospitalizacionesEliminar/:codigoHospitalizacion')
  @ApiOperation({ summary: 'Eliminar un registro de Hospitalizaciones' })
  @ApiParam({ name: 'codigoHospitalizacion', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoHospitalizacion', ParseIntPipe)
    codigoHospitalizacion: number,
  ) {
    return this.hospitalizacionesService.eliminar(codigoHospitalizacion);
  }
}
