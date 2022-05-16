import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../../service/auth.service';
declare var CryptoJSAesJson: any;

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  profileData: any;
  passwordFlag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    public sharedService: SharedService,
    private _Router: Router,
    private _AuthService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.passwordForm = this.formBuilder.group({
      id: [null],
      new_password: [null, [Validators.required]],
      new_password_confirmation: [null, [Validators.required]],
    });
  }
  encryptPassword() {
    let valueToEncrypt = this.passwordForm.value.new_password;
    let encreptionKey = "euro-claim-management-crypto-aes-key";
    return CryptoJSAesJson.encrypt(valueToEncrypt, encreptionKey);
  }
  onSubmit(passwordForm: FormGroup) {
    if(this.passwordForm.value.new_password == this.passwordForm.value.new_password_confirmation ){
      let formData = {
        id: this.passwordForm.value.id,
        new_password: this.encryptPassword(),
        new_password_confirmation:this.passwordForm.value.new_password_confirmation
      };
      formData.new_password_confirmation = formData.new_password,
      delete formData.id;
      this.passwordFlag = false;
      this._AuthService.editPassword(formData).subscribe(
        (res) => {
          this.cdr.detectChanges();
          this._Router.navigate(["/assignment"]);
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(`${translate.PASSWORD_CHANGE}`, "bg-green");
          });
        },
        (err) => {
          if(err.error!=null){
            this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
              this.sharedService.notification(
                `${translate[err.error]}`,
                "bg-red"
              );
            });
          }else{
            this.translate.get("BACKEDMESSAGE").subscribe((translate) => {
              this.sharedService.notification(
                `${translate[`Server Error`]}`,
                "bg-red"
              );
            });
          } 
        }
      );
    }else {
      this.passwordFlag = true;
    }

    
   
  }
}
