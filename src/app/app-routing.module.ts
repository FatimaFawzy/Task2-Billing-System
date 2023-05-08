import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FilterServicesComponent } from './filter-services/filter-services.component';
import { FilterBillsComponent } from './filter-bills/filter-bills.component';
const routes: Routes = [
  { path: '', component: LoginComponent }, // set login page as default route
  { path: 'login', component: LoginComponent },
  { path: 'FilterServices', component: FilterServicesComponent },
  { path: 'FilterBills/:id', component: FilterBillsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
