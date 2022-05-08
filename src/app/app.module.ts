import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecoratorDrivenDynamicFormsModule } from './dynamic-form/decorator-driven-dynamic-forms.module';
import { Todo } from './demo/todo';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DecoratorDrivenDynamicFormsModule.scan([Todo]),
    AdminModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
