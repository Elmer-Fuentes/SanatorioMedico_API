/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Pacientes
 * Descripción  : Endpoints REST del CRUD de Pacientes (documentados con Swagger).
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
import { PacientesService } from './pacientes.service.js';
import { AgregarPacientesDto } from './dto/agregar-pacientes.dto.js';
import { EditarPacientesDto } from './dto/editar-pacientes.dto.js';

@ApiTags('Pacientes')
@Controller('api')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE PACIENTES
  // ============================================================
  @Get('pacientesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Pacientes' })
  @ApiOkResponse({ description: 'Listado de Pacientes obtenido correctamente.' })
  async consultar() {
    return this.pacientesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR PACIENTES POR CÓDIGO
  // ============================================================
  @Get('pacientesBuscar/:codigoPaciente')
  @ApiOperation({ summary: 'Buscar un registro de Pacientes por su código' })
  @ApiParam({ name: 'codigoPaciente', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoPaciente', ParseIntPipe)
    codigoPaciente: number,
  ) {
    return this.pacientesService.buscar(codigoPaciente);
  }

  // ============================================================
  // POST: AGREGAR PACIENTES
  // ============================================================
  @Post('pacientesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Pacientes' })
  @ApiBody({ type: AgregarPacientesDto })
  async agregar(
    @Body()
    dto: AgregarPacientesDto,
  ) {
    return this.pacientesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR PACIENTES
  // ============================================================
  @Put('pacientesEditar/:codigoPaciente')
  @ApiOperation({ summary: 'Editar un registro existente de Pacientes' })
  @ApiParam({ name: 'codigoPaciente', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarPacientesDto })
  async editar(
    @Param('codigoPaciente', ParseIntPipe)
    codigoPaciente: number,
    @Body()
    dto: EditarPacientesDto,
  ) {
    return this.pacientesService.editar(codigoPaciente, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR PACIENTES
  // ============================================================
  @Delete('pacientesEliminar/:codigoPaciente')
  @ApiOperation({ summary: 'Eliminar un registro de Pacientes' })
  @ApiParam({ name: 'codigoPaciente', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoPaciente', ParseIntPipe)
    codigoPaciente: number,
  ) {
    return this.pacientesService.eliminar(codigoPaciente);
  }
}
