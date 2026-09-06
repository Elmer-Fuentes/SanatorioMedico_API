/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Especialidades
 * Descripción  : Endpoints REST del CRUD de Especialidades (documentados con Swagger).
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
import { EspecialidadesService } from './especialidades.service.js';
import { AgregarEspecialidadesDto } from './dto/agregar-especialidades.dto.js';
import { EditarEspecialidadesDto } from './dto/editar-especialidades.dto.js';

@ApiTags('Especialidades')
@Controller('api')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE ESPECIALIDADES
  // ============================================================
  @Get('especialidadesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Especialidades' })
  @ApiOkResponse({ description: 'Listado de Especialidades obtenido correctamente.' })
  async consultar() {
    return this.especialidadesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR ESPECIALIDADES POR CÓDIGO
  // ============================================================
  @Get('especialidadesBuscar/:codigoEspecialidad')
  @ApiOperation({ summary: 'Buscar un registro de Especialidades por su código' })
  @ApiParam({ name: 'codigoEspecialidad', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoEspecialidad', ParseIntPipe)
    codigoEspecialidad: number,
  ) {
    return this.especialidadesService.buscar(codigoEspecialidad);
  }

  // ============================================================
  // POST: AGREGAR ESPECIALIDADES
  // ============================================================
  @Post('especialidadesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Especialidades' })
  @ApiBody({ type: AgregarEspecialidadesDto })
  async agregar(
    @Body()
    dto: AgregarEspecialidadesDto,
  ) {
    return this.especialidadesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR ESPECIALIDADES
  // ============================================================
  @Put('especialidadesEditar/:codigoEspecialidad')
  @ApiOperation({ summary: 'Editar un registro existente de Especialidades' })
  @ApiParam({ name: 'codigoEspecialidad', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarEspecialidadesDto })
  async editar(
    @Param('codigoEspecialidad', ParseIntPipe)
    codigoEspecialidad: number,
    @Body()
    dto: EditarEspecialidadesDto,
  ) {
    return this.especialidadesService.editar(codigoEspecialidad, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR ESPECIALIDADES
  // ============================================================
  @Delete('especialidadesEliminar/:codigoEspecialidad')
  @ApiOperation({ summary: 'Eliminar un registro de Especialidades' })
  @ApiParam({ name: 'codigoEspecialidad', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoEspecialidad', ParseIntPipe)
    codigoEspecialidad: number,
  ) {
    return this.especialidadesService.eliminar(codigoEspecialidad);
  }
}
