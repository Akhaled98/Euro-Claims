import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "../shared/shared.service";
import { ProfileService } from "./profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileData: any;

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private _ProfileServiceL: ProfileService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this.initForm();
  }
  getProfileData() {
    this._ProfileServiceL.getProfileData().subscribe((res: any) => {
      this.profileData = res.data;
    });
  }
  initForm() {
    this.profileForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [0, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }
  onSubmit(profileForm: FormGroup) {
    let formValue = this.profileForm.value;
    delete formValue.id;
    this._ProfileServiceL.editProfileData(formValue).subscribe(
      (res) => {
        this.cdr.detectChanges();
        this.getProfileData();
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(`${translate.UPDATED_SUCCECFULLY}`, "bg-green");
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
