import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paging/login/login.component';
 import { LayoutComponent } from './paging/layout/layout.component';
// import { DashboardComponent } from './paging/dashboard/dashboard.component';
import { RegistrationComponent } from './paging/registration/registration.component';
const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'',component:RegistrationComponent,children:[{
        path:'LayoutComponent',
        component: LayoutComponent
      }]
  },
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }