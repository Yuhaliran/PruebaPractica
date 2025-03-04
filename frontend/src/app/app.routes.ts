import { Routes } from '@angular/router';
import { BuscarComponent } from '../componentes/buscar/buscar.component';
import { EliminarComponent } from '../componentes/eliminar/eliminar.component';
import { ModificarComponent } from '../componentes/modificar/modificar.component';
import { VerTodosComponent } from '../componentes/ver-todos/ver-todos.component';
import { CrearComponent} from '../componentes/crear/crear.component';

export const routes: Routes = [
  { path: 'buscar', component: BuscarComponent },
  { path: 'eliminar', component: EliminarComponent },
  { path: 'modificar', component: ModificarComponent },
  { path: 'todos', component: VerTodosComponent },
  { path: 'crear', component: CrearComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' }
];
