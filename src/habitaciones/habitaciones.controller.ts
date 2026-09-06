/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Habitaciones
 * Descripción  : Endpoints REST del CRUD de Habitaciones (documentados con Swagger).
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
import { HabitacionesService } from './habitaciones.service.js';
import { AgregarHabitacionesDto } from './dto/agregar-habitaciones.dto.js';
import { EditarHabitacionesDto } from './dto/editar-habitaciones.dto.js';

@ApiTags('Habitaciones')
@Controller('api')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE HABITACIONES
  // ============================================================
  @Get('habitacionesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Habitaciones' })
  @ApiOkResponse({ description: 'Listado de Habitaciones obtenido correctamente.' })
  async consultar() {
    return this.habitacionesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR HABITACIONES POR CÓDIGO
  // ============================================================
  @Get('habitacionesBuscar/:codigoHabitacion')
  @ApiOperation({ summary: 'Buscar un registro de Habitaciones por su código' })
  @ApiParam({ name: 'codigoHabitacion', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoHabitacion', ParseIntPipe)
    codigoHabitacion: number,
  ) {
    return this.habitacionesService.buscar(codigoHabitacion);
  }

  // ============================================================
  // POST: AGREGAR HABITACIONES
  // ============================================================
  @Post('habitacionesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Habitaciones' })
  @ApiBody({ type: AgregarHabitacionesDto })
  async agregar(
    @Body()
    dto: AgregarHabitacionesDto,
  ) {
    return this.habitacionesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR HABITACIONES
  // ============================================================
  @Put('habitacionesEditar/:codigoHabitacion')
  @ApiOperation({ summary: 'Editar un registro existente de Habitaciones' })
  @ApiParam({ name: 'codigoHabitacion', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarHabitacionesDto })
  async editar(
    @Param('codigoHabitacion', ParseIntPipe)
    codigoHabitacion: number,
    @Body()
    dto: EditarHabitacionesDto,
  ) {
    return this.habitacionesService.editar(codigoHabitacion, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR HABITACIONES
  // ============================================================
  @Delete('habitacionesEliminar/:codigoHabitacion')
  @ApiOperation({ summary: 'Eliminar un registro de Habitaciones' })
  @ApiParam({ name: 'codigoHabitacion', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoHabitacion', ParseIntPipe)
    codigoHabitacion: number,
  ) {
    return this.habitacionesService.eliminar(codigoHabitacion);
  }
}
