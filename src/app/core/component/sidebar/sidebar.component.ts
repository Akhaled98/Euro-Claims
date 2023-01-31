import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "src/app/authentication/service/auth.service";
import { ProfileService } from 'src/app/profile/profile.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  public parentId = "";
  profileData: any;
  error = "";
userType='';
userTypeRole=''

  
  clickedMenu(event) {
    var target = event.currentTarget;
    let parentId = target.id;
    if (parentId == this.parentId) {
      this.parentId = "";
    } else {
      this.parentId = target.id;
    }
  }
  
    


    constructor(
      private _ProfileServiceL: ProfileService,
      private _AuthService: AuthService,
      private _SharedService: SharedService,
      public translate: TranslateService,
      private _Router: Router,
      private cdr: ChangeDetectorRef) {
    
   }
  ngOnInit() {
    const body = document.querySelector('body');
    this.userType=localStorage.getItem("user type")
    this.userTypeRole=JSON.parse(localStorage.getItem("user details")).role
    console.log("user type: ",this.userType)
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
    this.getProfileData();
    this.cdr.detectChanges()



   
    
  }
  getProfileData() {
    console.log(this.userType)
if(this.userType=='admin'){
    this._ProfileServiceL.getProfileData().subscribe((res: any) => {
      this.profileData = res.data;
      console.log(this.profileData.name)
    });
  }
 else{
    this._ProfileServiceL.getUserProfileData().subscribe((res: any) => {
      this.profileData = res.data;
      console.log(this.profileData.name)
    });
  }
}

  logout() {
    this._AuthService.logout().subscribe(
      (response) => {
        if (response["status"] == "success") {
          this._AuthService.currenetUser.next(null);
          this._AuthService.displayController();
          localStorage.removeItem("userToken");
          localStorage.removeItem("user type");
          localStorage.removeItem("user details");
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

  logoutUser() {
    this._AuthService.logoutUser().subscribe(
      (response) => {
        if (response["status"] == "success") {
          this._AuthService.currenetUser.next(null);
          this._AuthService.displayController();
          localStorage.removeItem("userToken");
          localStorage.removeItem("user type");
          this._Router.navigate(["/authentication/user-login"]);
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
