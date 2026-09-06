/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Horarios
 * Descripción  : Endpoints REST del CRUD de Horarios (documentados con Swagger).
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
import { HorariosService } from './horarios.service.js';
import { AgregarHorariosDto } from './dto/agregar-horarios.dto.js';
import { EditarHorariosDto } from './dto/editar-horarios.dto.js';

@ApiTags('Horarios')
@Controller('api')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE HORARIOS
  // ============================================================
  @Get('horariosConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Horarios' })
  @ApiOkResponse({ description: 'Listado de Horarios obtenido correctamente.' })
  async consultar() {
    return this.horariosService.consultar();
  }

  // ============================================================
  // GET: BUSCAR HORARIOS POR CÓDIGO
  // ============================================================
  @Get('horariosBuscar/:codigoHorario')
  @ApiOperation({ summary: 'Buscar un registro de Horarios por su código' })
  @ApiParam({ name: 'codigoHorario', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoHorario', ParseIntPipe)
    codigoHorario: number,
  ) {
    return this.horariosService.buscar(codigoHorario);
  }

  // ============================================================
  // POST: AGREGAR HORARIOS
  // ============================================================
  @Post('horariosAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Horarios' })
  @ApiBody({ type: AgregarHorariosDto })
  async agregar(
    @Body()
    dto: AgregarHorariosDto,
  ) {
    return this.horariosService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR HORARIOS
  // ============================================================
  @Put('horariosEditar/:codigoHorario')
  @ApiOperation({ summary: 'Editar un registro existente de Horarios' })
  @ApiParam({ name: 'codigoHorario', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarHorariosDto })
  async editar(
    @Param('codigoHorario', ParseIntPipe)
    codigoHorario: number,
    @Body()
    dto: EditarHorariosDto,
  ) {
    return this.horariosService.editar(codigoHorario, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR HORARIOS
  // ============================================================
  @Delete('horariosEliminar/:codigoHorario')
  @ApiOperation({ summary: 'Eliminar un registro de Horarios' })
  @ApiParam({ name: 'codigoHorario', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoHorario', ParseIntPipe)
    codigoHorario: number,
  ) {
    return this.horariosService.eliminar(codigoHorario);
  }
}
