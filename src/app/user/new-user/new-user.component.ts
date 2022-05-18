import { ClientService } from "./../../client/client.service";
import { SharedService } from "src/app/shared/shared.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../user.service";
import { ActivatedRoute, Router } from "@angular/router";

declare var CryptoJSAesJson: any;

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  passwordFlag: boolean = false;
  oneUser: any;
  insuranceCompanyFlag: boolean = false;
  allCompany: any;
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private _UserService: UserService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _Router: Router,
    private _ClientService: ClientService
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id || null;
    if (id) {
      this._UserService.getUserById(id).subscribe((res) => {
        this.oneUser = res.data;
        this.newUserForm.patchValue(res.data);
      });
    }
    this.initForm();
    this.getActiveCompany();
  }
  initForm() {
    this.newUserForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      account_type: [null, [Validators.required]],
      insurance_company_id: [null],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
    });
  }
  getActiveCompany() {
    this._ClientService.getAllInsurance().subscribe((res) => {
      this.allCompany = res["data"];
      this.allCompany = this.allCompany.filter(
        (company) => company.status === "active"
      );
    });
  }
  encryptPassword() {
    let valueToEncrypt = this.newUserForm.value.password;
    let encreptionKey = "euro-claim-management-crypto-aes-key";
    return CryptoJSAesJson.encrypt(valueToEncrypt, encreptionKey);
  }
  patchingUserType(event) {
    if (event == "Agent") {
      this.newUserForm.value.account_type = event;
      this.insuranceCompanyFlag = false;
    } else {
      this.insuranceCompanyFlag = true;
      this.newUserForm.value.account_type = event;
    }
  }
  patchingInsuranceId(event) {
    this.newUserForm.value.insurance_company_id = event;
  }
  onSubmit(newUserForm: FormGroup) {
    console.log(this.newUserForm.value)
    if (
      this.newUserForm.value.password ==
      this.newUserForm.value.password_confirmation
    ) {
      if (this.oneUser != null) {
        let formData = {
          id: this.newUserForm.value.id,
          name: this.newUserForm.value.name,
          email: this.newUserForm.value.email,
          phone: this.newUserForm.value.phone,
          address: this.newUserForm.value.address,
          account_type: this.newUserForm.value.account_type,
          insurance_company_id: this.newUserForm.value.insurance_company_id,
          password: this.encryptPassword(),
          password_confirmation: this.newUserForm.value.password,
        };
        formData.password_confirmation = formData.password;
        delete formData.id;
        this.passwordFlag = false;
        this._UserService.updateUser(formData, this.oneUser?.id).subscribe(
          (res) => {
            this.translate.get("VALIDATION").subscribe((translate) => {
              this.sharedService.notification(
                `${translate.USER_UPDATED_SUCCECFULLY}`,
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
        let formData = {
          id: this.newUserForm.value.id,
          name: this.newUserForm.value.name,
          email: this.newUserForm.value.email,
          phone: this.newUserForm.value.phone,
          address: this.newUserForm.value.address,
          account_type: this.newUserForm.value.account_type,
          insurance_company_id: this.newUserForm.value.insurance_company_id,
          password: this.encryptPassword(),
          password_confirmation: this.newUserForm.value.password,
        };
        formData.password_confirmation = formData.password;
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
      }
    } else {
      this.passwordFlag = true;
    }
  }
}
