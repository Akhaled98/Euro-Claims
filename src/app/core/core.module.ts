import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { CoreRoutingModule } from "./core-routing.module";
import { NavbarComponent } from "./component/navbar/navbar.component";
import { SidebarComponent } from "./component/sidebar/sidebar.component";
import { SettingsPanelComponent } from "./component/settings-panel/settings-panel.component";
import { FooterComponent } from "./component/footer/footer.component";
import { SpinnerComponent } from "./component/spinner/spinner.component";
import { MainLayoutComponent } from "./component/main-layout/main-layout.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {HttpClientModule, HttpClient ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SettingsPanelComponent,
    FooterComponent,
    MainLayoutComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgbModule,
    HttpClientModule,
    TranslateModule,
    MatSnackBarModule,
  
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SettingsPanelComponent,
    FooterComponent,
    MainLayoutComponent,
    SpinnerComponent,
  ],
})
export class CoreModule {}
