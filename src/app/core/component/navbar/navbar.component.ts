import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/authentication/service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "src/app/shared/shared.service";
import { ProfileService } from "src/app/profile/profile.service";

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
  profileData: any;

  constructor(
    config: NgbDropdownConfig,
    private _AuthService: AuthService,
    public translate: TranslateService,
    private _Router: Router,
    private _SharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private _ProfileServiceL: ProfileService
  ) {
    config.placement = "bottom-right";
  }

  ngOnInit() {
    this.getProfileData();
  
  }
  getProfileData() {
    this._ProfileServiceL.getProfileData().subscribe((res: any) => {
      this.profileData = res.data;
    });
  }

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



  logout() {
    this._AuthService.logout().subscribe(
      (response) => {
        if (response["status"] == "success") {
          this._AuthService.currenetUser.next(null);
          this._AuthService.displayController();
          localStorage.removeItem("userToken");
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
        if (err.error != null) {
          this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
            this._SharedService.notification(
              `${translate[err.error]}`,
              "bg-red"
            );
          });
        } else {
          this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
            this._SharedService.notification(
              `${translate[`Unauthenticated.`]}`,
              "bg-red"
            );
          });
        }
        if (err.status == "failed") {
          this.error = err.error;
        }
      }
    );


  }
}
