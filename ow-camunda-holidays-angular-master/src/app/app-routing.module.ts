import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'task/:processInstanceId',
      loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
    },
    {
      path: 'list',
      loadChildren: () => import('./task-list/task-list.module').then((m) => m.TaskListModule),
    },
    {
      path: 'history',
      loadChildren: () => import('./task-history/task-history.module').then((m) => m.TaskHistoryModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
