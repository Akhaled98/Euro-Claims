import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { from } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { AuthService } from "../service/auth.service";

declare var CryptoJSAesJson: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = "";
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _Router: Router,
    private _AuthService: AuthService,
    public translate: TranslateService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  encryptPassword() {
    let valueToEncrypt = this.loginForm.value.password;
    let encreptionKey = "euro-claim-management-crypto-aes-key";
    return CryptoJSAesJson.encrypt(valueToEncrypt, encreptionKey);
  }

  onSubmit(loginForm: FormGroup) {
    this.submitted = true;
    this.error = "";
    if (this.loginForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
        let formData = {
          email: loginForm.value.email,
          password: this.encryptPassword(),
        };
        this._AuthService.login(formData).subscribe(
          (response) => {
            localStorage.setItem("userToken", response.data.access_token);
            this._AuthService.saveCurrentUser(); // to decode token and save in currentUser
            this._Router.navigate(["/assignment"]);
            this.translate.get("VALIDATION").subscribe((translate) => {
              this.sharedService.notification(
                `${translate.SIGN_IN}`,
                "bg-green"
              );
            });
          },
          (err) => {
            this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
              this.sharedService.notification(
                `${translate[err.error]}`,
                "bg-red"
              );
            });
          }
        );
      } 
  }
}
