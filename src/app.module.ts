/**
 * ============================================================
 * Proyecto     : Sanatorio Médico API
 * Módulo       : App (raíz)
 * Descripción  : Módulo raíz de la aplicación. Registra la configuración
 *                global (.env) y todos los módulos de negocio del sistema
 *                Sanatorio Médico, para que sus controladores/rutas queden
 *                expuestos por Nest.
 * Autor        : Elmer Fuentes
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';

// ============================================================
// MÓDULOS DE NEGOCIO (uno por tabla del sistema Sanatorio Médico)
// ============================================================
import { SucursalesModule } from './sucursales/sucursales.module.js';
import { RolesModule } from './roles/roles.module.js';
import { ColaboradoresModule } from './colaboradores/colaboradores.module.js';
import { PacientesModule } from './pacientes/pacientes.module.js';
import { EspecialidadesModule } from './especialidades/especialidades.module.js';
import { ColaboradoresEspecialidadesModule } from './colaboradores-especialidades/colaboradores-especialidades.module.js';
import { HorariosModule } from './horarios/horarios.module.js';
import { CitasConsultasModule } from './citas-consultas/citas-consultas.module.js';
import { CitasConsultasDetalleModule } from './citas-consultas-detalle/citas-consultas-detalle.module.js';
import { HabitacionesModule } from './habitaciones/habitaciones.module.js';
import { HospitalizacionesModule } from './hospitalizaciones/hospitalizaciones.module.js';
import { ProductosModule } from './productos/productos.module.js';
import { ProveedoresModule } from './proveedores/proveedores.module.js';
import { MovimientosInventarioModule } from './movimientos-inventario/movimientos-inventario.module.js';
import { FacturasModule } from './facturas/facturas.module.js';
import { FacturasDetalleModule } from './facturas-detalle/facturas-detalle.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SucursalesModule,
    RolesModule,
    ColaboradoresModule,
    PacientesModule,
    EspecialidadesModule,
    ColaboradoresEspecialidadesModule,
    HorariosModule,
    CitasConsultasModule,
    CitasConsultasDetalleModule,
    HabitacionesModule,
    HospitalizacionesModule,
    ProductosModule,
    ProveedoresModule,
    MovimientosInventarioModule,
    FacturasModule,
    FacturasDetalleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
