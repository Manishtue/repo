import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {GridComponent} from './grid/grid.component';
import { TempComponent } from './temp/temp.component';
import { RegisterationComponent } from './registeration/registeration.component';


const routes: Routes = [
// {path: 'login', component: LoginComponent},
{path: 'home', component: HomeComponent},
{path: 'grid', component: GridComponent},
{path: 'temp', component: TempComponent},
{path: '', component: RegisterationComponent},
{path: 'register', component: RegisterationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
