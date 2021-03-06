import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { SEOService } from '../core/services/seo.service';

@NgModule({
  declarations: [
    DeliveryComponent,
    AboutComponent,
    ContactsComponent,
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslateModule
  ],
  providers: [
    SEOService
  ]
})
export class PagesModule { }
