import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { ProductsComponent } from './shopping/products/products.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    AdminModule,
    CoreModule,
    ShoppingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
