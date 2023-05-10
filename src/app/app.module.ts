import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterServicesComponent } from './filter-services/filter-services.component';
import { FilterBillsComponent } from './filter-bills/filter-bills.component';
import { AddBillFormComponent } from './add-bill-form/add-bill-form.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LogoutComponent } from './logout/logout.component';
import { FiterFormComponent } from './filter-services/fiter-form/fiter-form.component';
import { FilterResultComponent } from './filter-services/filter-result/filter-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilterServicesComponent,
    FilterBillsComponent,
    AddBillFormComponent,
    LoadingSpinnerComponent,
    LogoutComponent,
    FiterFormComponent,
    FilterResultComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
