import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  profileData: any;

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
  onSubmit(passwordForm: FormGroup) {
    let formValue = this.passwordForm.value;
    delete formValue.id;
    this._AuthService.editPassword(formValue).subscribe(
      (res) => {
        this.cdr.detectChanges();
        this._Router.navigate(["/assignment"]);
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(`${translate.PASSWORD_CHANGE}`, "bg-green");
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
