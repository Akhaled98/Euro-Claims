import { AuthService } from "./authentication/service/auth.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  Router,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "EURO Claim";

  showSidebar: boolean = false;
  showNavbar: boolean = false;
  showSettings: boolean = false;
  isLoading: boolean;
 

  constructor(
    private router: Router,
    translate: TranslateService,
    private _AuthService: AuthService,
    private cdr: ChangeDetectorRef,

  ) {

    
    //  Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event["url"] == "/user-pages/login" ||
          event["url"] == "/authentication/login" ||
          event["url"] == "/user-pages/register" ||
          event["url"] == "/user-pages/register-2" ||
          event["url"] == "/user-pages/lock-screen" ||
          event["url"] == "/error-pages/404" ||
          event["url"] == "/error-pages/500"
        ) {
          translate.use("ar");
          document.querySelector("body").classList.add("rtl");
          this._AuthService.showNavbar.subscribe(() => {
            if (this._AuthService.showNavbar.getValue() == false) {
              this.showNavbar = false;
            } else {
              this.showNavbar = true;
            }
            this.cdr.detectChanges();
          });
          this._AuthService.showSidebar.subscribe(() => {
            if (this._AuthService.showSidebar.getValue() == false) {
              this.showSidebar = false;
            } else {
              this.showSidebar = true;
            }
            this.cdr.detectChanges();
          });
          this._AuthService.showSettings.subscribe(() => {
            if (this._AuthService.showSettings.getValue() == false) {
              this.showSettings = false;
            } else {
              this.showSettings = true;
            }
            this.cdr.detectChanges();
          });

          document.querySelector(".main-panel").classList.add("w-100");
          document
            .querySelector(".page-body-wrapper")
            .classList.add("full-page-wrapper");
          if (
            event["url"] == "/user-pages/login" ||
            event["url"] == "/authentication/login" ||
            event["url"] == "/user-pages/register-2"
          ) {
            document
              .querySelector(".content-wrapper")
              .classList.add("auth", "auth-img-bg");
          } else if (event["url"] == "/user-pages/lock-screen") {
            document
              .querySelector(".content-wrapper")
              .classList.add("auth", "lock-full-bg");
          } else {
            document
              .querySelector(".content-wrapper")
              .classList.remove("auth", "auth-img-bg");
            document
              .querySelector(".content-wrapper")
              .classList.remove("auth", "lock-full-bg");
          }
          if (
            event["url"] == "/error-pages/404" ||
            event["url"] == "/error-pages/500"
          ) {
            document.querySelector(".content-wrapper").classList.add("p-0");
          }
        } else {
          translate.use("ar");
          document.querySelector("body").classList.add("rtl");
        
          this._AuthService.showNavbar.subscribe(() => {
            if (this._AuthService.showNavbar.getValue() == false) {
              this.showNavbar = false;
            } else {
              this.showNavbar = true;
            }
            this.cdr.detectChanges();
          });
          this._AuthService.showSidebar.subscribe(() => {
            if (this._AuthService.showSidebar.getValue() == false) {
              this.showSidebar = false;
            } else {
              this.showSidebar = true;
            }
            this.cdr.detectChanges();
          });
          this._AuthService.showSettings.subscribe(() => {
            if (this._AuthService.showSettings.getValue() == false) {
              this.showSettings = false;
            } else {
              this.showSettings = true;
            }
            this.cdr.detectChanges();
          });

          document.querySelector(".main-panel").classList.remove("w-100");
          document
            .querySelector(".page-body-wrapper")
            .classList.remove("full-page-wrapper");
          document
            .querySelector(".content-wrapper")
            .classList.remove("auth", "auth-img-bg");
          document.querySelector(".content-wrapper").classList.remove("p-0");
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    //  Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    
  }
 
}
