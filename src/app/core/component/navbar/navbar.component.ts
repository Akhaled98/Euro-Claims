import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/authentication/service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  providers: [NgbDropdownConfig],
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  error = "";
  showUserOptions: boolean = false;
  constructor(
    config: NgbDropdownConfig,
    private _AuthService: AuthService,
    public translate: TranslateService,
    private _Router: Router,
    private _SharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    config.placement = "bottom-right";
  }

  ngOnInit() {}

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector("body");
    if (
      !body.classList.contains("sidebar-toggle-display") &&
      !body.classList.contains("sidebar-absolute")
    ) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add("sidebar-icon-only");
      } else {
        body.classList.remove("sidebar-icon-only");
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add("sidebar-hidden");
      } else {
        body.classList.remove("sidebar-hidden");
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector("#right-sidebar").classList.toggle("open");
  }

  logout() {
    this.check_User_Admin();
    if(this.showUserOptions == true){
      this._AuthService.logoutAdmin().subscribe(
        (response) => {
          if (response["status"] == "success") {
            this._AuthService.currenetUser.next(null);
            this._AuthService.displayControllerAdmin();
            localStorage.removeItem("userToken");
            localStorage.removeItem("UserType");
            this._Router.navigate(["/authentication/login"]);
            this.translate.get("VALIDATION").subscribe((translate) => {
              this._SharedService.notification(
                `${translate.SIGN_OUT}`,
                "bg-green"
              );
            });
          }
        },
        (err) => {
          this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
            this._SharedService.notification(`${translate[err.error]}`, "bg-red");
          });
          if (err.status == "failed") {
            this.error = err.error;
          }
        }
      );
    }else{
      this._AuthService.logoutGeneral().subscribe(
        (response) => {
          if (response["status"] == "success") {
            this._AuthService.currenetUser.next(null);
            this._AuthService.displayControllerGeneral();
            localStorage.removeItem("userToken");
            localStorage.removeItem("UserType");
            this._Router.navigate(["/authentication/login"]);
            this.translate.get("VALIDATION").subscribe((translate) => {
              this._SharedService.notification(
                `${translate.SIGN_OUT}`,
                "bg-green"
              );
            });
          }
        },
        (err) => {
          this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
            this._SharedService.notification(`${translate[err.error]}`, "bg-red");
          });
          if (err.status == "failed") {
            this.error = err.error;
          }
        }
      );
    }
  
  }
  check_User_Admin() {
    this._AuthService.showUserOptions.subscribe(() => {
      if (this._AuthService.showUserOptions.getValue() == false) {
        this.showUserOptions = false;
      } else {
        this.showUserOptions = true;
      }
    });
  }
}
