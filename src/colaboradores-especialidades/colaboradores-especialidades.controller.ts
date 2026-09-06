/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : ColaboradoresEspecialidades
 * Descripción  : Endpoints REST del CRUD de ColaboradoresEspecialidades (documentados con Swagger).
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
import { ColaboradoresEspecialidadesService } from './colaboradores-especialidades.service.js';
import { AgregarColaboradoresEspecialidadesDto } from './dto/agregar-colaboradores-especialidades.dto.js';
import { EditarColaboradoresEspecialidadesDto } from './dto/editar-colaboradores-especialidades.dto.js';

@ApiTags('ColaboradoresEspecialidades')
@Controller('api')
export class ColaboradoresEspecialidadesController {
  constructor(private readonly colaboradoresEspecialidadesService: ColaboradoresEspecialidadesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE COLABORADORESESPECIALIDADES
  // ============================================================
  @Get('colaboradoresEspecialidadesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de ColaboradoresEspecialidades' })
  @ApiOkResponse({ description: 'Listado de ColaboradoresEspecialidades obtenido correctamente.' })
  async consultar() {
    return this.colaboradoresEspecialidadesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR COLABORADORESESPECIALIDADES POR CÓDIGO
  // ============================================================
  @Get('colaboradoresEspecialidadesBuscar/:codigoColaboradorEspecialidad')
  @ApiOperation({ summary: 'Buscar un registro de ColaboradoresEspecialidades por su código' })
  @ApiParam({ name: 'codigoColaboradorEspecialidad', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoColaboradorEspecialidad', ParseIntPipe)
    codigoColaboradorEspecialidad: number,
  ) {
    return this.colaboradoresEspecialidadesService.buscar(codigoColaboradorEspecialidad);
  }

  // ============================================================
  // POST: AGREGAR COLABORADORESESPECIALIDADES
  // ============================================================
  @Post('colaboradoresEspecialidadesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de ColaboradoresEspecialidades' })
  @ApiBody({ type: AgregarColaboradoresEspecialidadesDto })
  async agregar(
    @Body()
    dto: AgregarColaboradoresEspecialidadesDto,
  ) {
    return this.colaboradoresEspecialidadesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR COLABORADORESESPECIALIDADES
  // ============================================================
  @Put('colaboradoresEspecialidadesEditar/:codigoColaboradorEspecialidad')
  @ApiOperation({ summary: 'Editar un registro existente de ColaboradoresEspecialidades' })
  @ApiParam({ name: 'codigoColaboradorEspecialidad', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarColaboradoresEspecialidadesDto })
  async editar(
    @Param('codigoColaboradorEspecialidad', ParseIntPipe)
    codigoColaboradorEspecialidad: number,
    @Body()
    dto: EditarColaboradoresEspecialidadesDto,
  ) {
    return this.colaboradoresEspecialidadesService.editar(codigoColaboradorEspecialidad, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR COLABORADORESESPECIALIDADES
  // ============================================================
  @Delete('colaboradoresEspecialidadesEliminar/:codigoColaboradorEspecialidad')
  @ApiOperation({ summary: 'Eliminar un registro de ColaboradoresEspecialidades' })
  @ApiParam({ name: 'codigoColaboradorEspecialidad', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoColaboradorEspecialidad', ParseIntPipe)
    codigoColaboradorEspecialidad: number,
  ) {
    return this.colaboradoresEspecialidadesService.eliminar(codigoColaboradorEspecialidad);
  }
}
