/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Colaboradores
 * Descripción  : Endpoints REST del CRUD de Colaboradores (documentados con Swagger).
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
import { ColaboradoresService } from './colaboradores.service.js';
import { AgregarColaboradoresDto } from './dto/agregar-colaboradores.dto.js';
import { EditarColaboradoresDto } from './dto/editar-colaboradores.dto.js';

@ApiTags('Colaboradores')
@Controller('api')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE COLABORADORES
  // ============================================================
  @Get('colaboradoresConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Colaboradores' })
  @ApiOkResponse({ description: 'Listado de Colaboradores obtenido correctamente.' })
  async consultar() {
    return this.colaboradoresService.consultar();
  }

  // ============================================================
  // GET: BUSCAR COLABORADORES POR CÓDIGO
  // ============================================================
  @Get('colaboradoresBuscar/:codigoColaborador')
  @ApiOperation({ summary: 'Buscar un registro de Colaboradores por su código' })
  @ApiParam({ name: 'codigoColaborador', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoColaborador', ParseIntPipe)
    codigoColaborador: number,
  ) {
    return this.colaboradoresService.buscar(codigoColaborador);
  }

  // ============================================================
  // POST: AGREGAR COLABORADORES
  // ============================================================
  @Post('colaboradoresAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Colaboradores' })
  @ApiBody({ type: AgregarColaboradoresDto })
  async agregar(
    @Body()
    dto: AgregarColaboradoresDto,
  ) {
    return this.colaboradoresService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR COLABORADORES
  // ============================================================
  @Put('colaboradoresEditar/:codigoColaborador')
  @ApiOperation({ summary: 'Editar un registro existente de Colaboradores' })
  @ApiParam({ name: 'codigoColaborador', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarColaboradoresDto })
  async editar(
    @Param('codigoColaborador', ParseIntPipe)
    codigoColaborador: number,
    @Body()
    dto: EditarColaboradoresDto,
  ) {
    return this.colaboradoresService.editar(codigoColaborador, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR COLABORADORES
  // ============================================================
  @Delete('colaboradoresEliminar/:codigoColaborador')
  @ApiOperation({ summary: 'Eliminar un registro de Colaboradores' })
  @ApiParam({ name: 'codigoColaborador', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoColaborador', ParseIntPipe)
    codigoColaborador: number,
  ) {
    return this.colaboradoresService.eliminar(codigoColaborador);
  }
}
