import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BsNavbarComponent, HomeComponent, LoginComponent],
  imports: [SharedModule, RouterModule.forChild([])],
  exports: [BsNavbarComponent],
})
export class CoreModule {}
