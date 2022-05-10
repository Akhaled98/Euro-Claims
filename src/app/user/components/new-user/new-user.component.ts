import { SharedService } from "src/app/shared/shared.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../../user.service";
import { Router } from "@angular/router";

declare var CryptoJSAesJson: any;

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  passwordFlag: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private _UserService: UserService,
    private cdr: ChangeDetectorRef,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.newUserForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
    });
  }

  encryptPassword() {
    let valueToEncrypt = this.newUserForm.value.password;
    let encreptionKey = "euro-claim-management-crypto-aes-key";
    return CryptoJSAesJson.encrypt(valueToEncrypt, encreptionKey);
  }
  onSubmit(newUserForm: FormGroup) {
    if (
      this.newUserForm.value.password ==
      this.newUserForm.value.password_confirmation
    ) {
      let formData = {
        id: this.newUserForm.value.id,
        name: this.newUserForm.value.name,
        email: this.newUserForm.value.email,
        phone: this.newUserForm.value.phone,
        address: this.newUserForm.value.address,
        password: this.encryptPassword(),
        password_confirmation:this.newUserForm.value.password
      };
      formData.password_confirmation = formData.password,
      delete formData.id;
      this.passwordFlag = false;

      this._UserService.createNewUser(formData).subscribe(
        (res) => {
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(
              `${translate.USER_ADDED_SUCCECFULLY}`,
              "bg-green"
            );
          });
          this._Router.navigate(["/user/list"]);
          this.cdr.detectChanges();
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
    } else {
      this.passwordFlag = true;
    }
  }
}
