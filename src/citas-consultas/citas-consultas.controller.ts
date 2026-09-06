/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : CitasConsultas
 * Descripción  : Endpoints REST del CRUD de CitasConsultas (documentados con Swagger).
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
import { CitasConsultasService } from './citas-consultas.service.js';
import { AgregarCitasConsultasDto } from './dto/agregar-citas-consultas.dto.js';
import { EditarCitasConsultasDto } from './dto/editar-citas-consultas.dto.js';

@ApiTags('CitasConsultas')
@Controller('api')
export class CitasConsultasController {
  constructor(private readonly citasConsultasService: CitasConsultasService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE CITASCONSULTAS
  // ============================================================
  @Get('citasConsultasConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de CitasConsultas' })
  @ApiOkResponse({ description: 'Listado de CitasConsultas obtenido correctamente.' })
  async consultar() {
    return this.citasConsultasService.consultar();
  }

  // ============================================================
  // GET: BUSCAR CITASCONSULTAS POR CÓDIGO
  // ============================================================
  @Get('citasConsultasBuscar/:codigoCitaConsulta')
  @ApiOperation({ summary: 'Buscar un registro de CitasConsultas por su código' })
  @ApiParam({ name: 'codigoCitaConsulta', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoCitaConsulta', ParseIntPipe)
    codigoCitaConsulta: number,
  ) {
    return this.citasConsultasService.buscar(codigoCitaConsulta);
  }

  // ============================================================
  // POST: AGREGAR CITASCONSULTAS
  // ============================================================
  @Post('citasConsultasAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de CitasConsultas' })
  @ApiBody({ type: AgregarCitasConsultasDto })
  async agregar(
    @Body()
    dto: AgregarCitasConsultasDto,
  ) {
    return this.citasConsultasService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR CITASCONSULTAS
  // ============================================================
  @Put('citasConsultasEditar/:codigoCitaConsulta')
  @ApiOperation({ summary: 'Editar un registro existente de CitasConsultas' })
  @ApiParam({ name: 'codigoCitaConsulta', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarCitasConsultasDto })
  async editar(
    @Param('codigoCitaConsulta', ParseIntPipe)
    codigoCitaConsulta: number,
    @Body()
    dto: EditarCitasConsultasDto,
  ) {
    return this.citasConsultasService.editar(codigoCitaConsulta, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR CITASCONSULTAS
  // ============================================================
  @Delete('citasConsultasEliminar/:codigoCitaConsulta')
  @ApiOperation({ summary: 'Eliminar un registro de CitasConsultas' })
  @ApiParam({ name: 'codigoCitaConsulta', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoCitaConsulta', ParseIntPipe)
    codigoCitaConsulta: number,
  ) {
    return this.citasConsultasService.eliminar(codigoCitaConsulta);
  }
}
