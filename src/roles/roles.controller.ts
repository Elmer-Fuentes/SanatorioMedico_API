/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : Roles
 * Descripción  : Endpoints REST del CRUD de Roles (documentados con Swagger).
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
import { RolesService } from './roles.service.js';
import { AgregarRolesDto } from './dto/agregar-roles.dto.js';
import { EditarRolesDto } from './dto/editar-roles.dto.js';

@ApiTags('Roles')
@Controller('api')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // ============================================================
  // GET: CONSULTAR TODOS LOS REGISTROS DE ROLES
  // ============================================================
  @Get('rolesConsultar')
  @ApiOperation({ summary: 'Consultar todos los registros de Roles' })
  @ApiOkResponse({ description: 'Listado de Roles obtenido correctamente.' })
  async consultar() {
    return this.rolesService.consultar();
  }

  // ============================================================
  // GET: BUSCAR ROLES POR CÓDIGO
  // ============================================================
  @Get('rolesBuscar/:codigoRol')
  @ApiOperation({ summary: 'Buscar un registro de Roles por su código' })
  @ApiParam({ name: 'codigoRol', type: Number, description: 'Código del registro a buscar.' })
  async buscar(
    @Param('codigoRol', ParseIntPipe)
    codigoRol: number,
  ) {
    return this.rolesService.buscar(codigoRol);
  }

  // ============================================================
  // POST: AGREGAR ROLES
  // ============================================================
  @Post('rolesAgregar')
  @ApiOperation({ summary: 'Agregar un nuevo registro de Roles' })
  @ApiBody({ type: AgregarRolesDto })
  async agregar(
    @Body()
    dto: AgregarRolesDto,
  ) {
    return this.rolesService.agregar(dto);
  }

  // ============================================================
  // PUT: EDITAR ROLES
  // ============================================================
  @Put('rolesEditar/:codigoRol')
  @ApiOperation({ summary: 'Editar un registro existente de Roles' })
  @ApiParam({ name: 'codigoRol', type: Number, description: 'Código del registro a editar.' })
  @ApiBody({ type: EditarRolesDto })
  async editar(
    @Param('codigoRol', ParseIntPipe)
    codigoRol: number,
    @Body()
    dto: EditarRolesDto,
  ) {
    return this.rolesService.editar(codigoRol, dto);
  }

  // ============================================================
  // DELETE: ELIMINAR ROLES
  // ============================================================
  @Delete('rolesEliminar/:codigoRol')
  @ApiOperation({ summary: 'Eliminar un registro de Roles' })
  @ApiParam({ name: 'codigoRol', type: Number, description: 'Código del registro a eliminar.' })
  async eliminar(
    @Param('codigoRol', ParseIntPipe)
    codigoRol: number,
  ) {
    return this.rolesService.eliminar(codigoRol);
  }
}
