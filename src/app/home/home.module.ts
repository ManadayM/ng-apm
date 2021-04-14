import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome.component';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [HomeRoutingModule]
})
export class HomeModule { }
