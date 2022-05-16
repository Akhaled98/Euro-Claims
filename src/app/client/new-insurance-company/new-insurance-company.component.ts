import { ClientService } from "./../client.service";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "src/app/shared/shared.service";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: "app-new-insurance-company",
  templateUrl: "./new-insurance-company.component.html",
  styleUrls: ["./new-insurance-company.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewInsuranceCompanyComponent implements OnInit {
  newInsuranceCompanyForm: FormGroup;
  passwordFlag: boolean = false;
  oneInsuranceCompany: any;
  activeLabel: string;
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _Router: Router,
    private _ClientService: ClientService
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params.id || null;
    if (id) {
      this._ClientService.getInsuranceById(id).subscribe((res) => {
        this.oneInsuranceCompany = res.data;
        this.newInsuranceCompanyForm.patchValue(res.data);
      });
    }
    this.initForm();
  }
  initForm() {
    this.newInsuranceCompanyForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      contact_person: [null, [Validators.required]],
      status: [null],
    });
  }
  toggleActive(event: MatSlideToggleChange) {
    if (event.checked == true) {
      this.newInsuranceCompanyForm.value.status = "active";
    } else {
      this.newInsuranceCompanyForm.value.status = "blocked";
    }
    this.translate.get("PAGE.USERS").subscribe((translate) => {
      this.activeLabel = event.checked ? translate.ACTIVE : translate.DEACTIVE;
    });
  }

  onSubmit(newInsuranceCompanyForm: FormGroup) {
    if (this.oneInsuranceCompany != null) {
      let formData = {
        id: this.newInsuranceCompanyForm.value.id,
        name: this.newInsuranceCompanyForm.value.name,
        phone: this.newInsuranceCompanyForm.value.phone,
        address: this.newInsuranceCompanyForm.value.address,
        contact_person: this.newInsuranceCompanyForm.value.contact_person,
        status: this.newInsuranceCompanyForm.value.status,
      };
      delete formData.id;
      this._ClientService
        .updateInsurance(formData, this.oneInsuranceCompany?.id)
        .subscribe(
          (res) => {
            this.cdr.detectChanges();
            this.translate.get("VALIDATION").subscribe((translate) => {
              this.sharedService.notification(
                `${translate.INSURANCE_ADDED_SUCCECFULLY}`,
                "bg-green"
              );
            });
            this._Router.navigate(["/client/list"]);
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
        id: this.newInsuranceCompanyForm.value.id,
        name: this.newInsuranceCompanyForm.value.name,
        phone: this.newInsuranceCompanyForm.value.phone,
        address: this.newInsuranceCompanyForm.value.address,
        contact_person: this.newInsuranceCompanyForm.value.contact_person,
        status: this.newInsuranceCompanyForm.value.status,
      };
      delete formData.id;
      console.log(formData);
      this._ClientService.createInsuranceCompany(formData).subscribe(
        (res) => {
          this.cdr.detectChanges();
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(
              `${translate.INSURANCE_ADDED_SUCCECFULLY}`,
              "bg-green"
            );
          });
          this._Router.navigate(["/client/list"]);
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
