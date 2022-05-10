import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from '../../user.service';
declare var CryptoJSAesJson: any;

@Component({
  selector: 'app-new-insurance-company',
  templateUrl: './new-insurance-company.component.html',
  styleUrls: ['./new-insurance-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInsuranceCompanyComponent implements OnInit {

  newInsuranceCompanyForm: FormGroup;
  passwordFlag: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private _UserService:UserService,
    private cdr: ChangeDetectorRef,
    private _Router:Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.newInsuranceCompanyForm = this.formBuilder.group({
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
    let valueToEncrypt = this.newInsuranceCompanyForm.value.password;
    let encreptionKey = "euro-claim-management-crypto-aes-key";
    return CryptoJSAesJson.encrypt(valueToEncrypt, encreptionKey);
  }
  onSubmit(newInsuranceCompanyForm: FormGroup) {
    if (
      this.newInsuranceCompanyForm.value.password ==
      this.newInsuranceCompanyForm.value.password_confirmation
    ){
      let formData = {
        id:  this.newInsuranceCompanyForm.value.id,
        name: this.newInsuranceCompanyForm.value.name,
        email: this.newInsuranceCompanyForm.value.email,
        phone: this.newInsuranceCompanyForm.value.phone,
        address: this.newInsuranceCompanyForm.value.address,
        password: this.encryptPassword(),
        password_confirmation:this.newInsuranceCompanyForm.value.password
      };
      formData.password_confirmation = formData.password,
      delete formData.id;
      this.passwordFlag = false;
      this._UserService.createInsuranceCompany(formData).subscribe(
        (res) => {
          this.cdr.detectChanges();
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(`${translate.INSURANCE_ADDED_SUCCECFULLY}`, "bg-green");
          });
          this._Router.navigate(['/user/list'])
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
    }else{
      this.passwordFlag = true;
    }
    
  }

}
