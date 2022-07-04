import { AssignmentService } from './../../assignment.service';
import { ClientService } from "./../../../client/client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../../user/user.service";
import { SharedService } from "./../../../shared/shared.service";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-add-assignment",
  templateUrl: "./add-assignment.component.html",
  styleUrls: ["./add-assignment.component.scss"],
})
export class AddAssignmentComponent implements OnInit {
  newAssignmentForm: FormGroup;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  HFormGroup3: FormGroup;
  HFormGroup4: FormGroup;
  passwordFlag: boolean = false;
  oneUser: any;
  insuranceCompanyFlag: boolean = false;
  allCompany: any;
  allUser:any;
  allExaminationType: any;
  allExaminationLocationType:any;
  color: any;
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private _UserService: UserService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _Router: Router,
    private _ClientService: ClientService,
    private _AssignmentService:AssignmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initForms();
    this.getActiveCompany();
    this.getExaminationType();
    this.getExaminationLocationType();
    this.getAgentUser();
  }
  initForm() {
    this.newAssignmentForm = this.formBuilder.group({
      id: [null],
      customer_name: [null, [Validators.required]],
      customer_phone: [null, [Validators.required]],
      customer_address: [null, [Validators.required]],
      insurance_company_id: [null, [Validators.required]],
      car_document_number: [null, [Validators.required]],
      car_vin_decoder: [null, [Validators.required]],
      car_plate_number: [null, [Validators.required]],
      car_engine_number: [null, [Validators.required]],
      car_color: [null, [Validators.required]],
      car_model: [null, [Validators.required]],
      examination_type_id:[null,[Validators.required]],
      examination_location_type_id:[null,[Validators.required]],
      examination_location_address:[null,[Validators.required]],
      contact_person_name: [null, [Validators.required]],
      contact_person_phone: [null, [Validators.required]],
      assigned_to: [null],
      examination_date: [null],
      examination_from_time: [null],
      examination_to_time: [null],
    });
  }

  initForms() {
    this.HFormGroup1 = this.formBuilder.group({
      arFullName: ['', Validators.required],
      enFullName: ['', Validators.required],
      empNumber: [null],
      gender: [null],
      birthDate: [null],
      birthPlace: [null],
      religion: [null],
      mobileNumber: ['', Validators.required],
      homePhoneNumber: ['', Validators.required],
      nationality: [null],
      cityId: [null],
      countryId: [null],
    });
    this.HFormGroup2 = this.formBuilder.group({
      educationalQualification: [null],
      faculty: [null],
      graduationYear: [null],
      specialization: [null],
    });

    this.HFormGroup3 = this.formBuilder.group({
      contractCareer: [null],
      contractType: [null],
      contractPeriod: [null],
      contractStDate: [null],
      passportNo: [null],
      passportStDate: [null],
      passportNdDate: [null],
      workStDate: [null],
      migrationNo: [null],
      migrationStDate: [null],
      migrationNdDate: [null],
      entryNo: [null],
      guarantorId: [null]

    });
    this.HFormGroup4 = this.formBuilder.group({
      jobId: [null],
      unitId: [null],
      accountId: [null],

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
  getAgentUser() {
    this._UserService.getAllUser().subscribe((res) => {
      this.allUser = res["data"];
      this.allUser = this.allUser.filter(
        (user) => user.role === "Agent"
      );
    });
  }
  getExaminationType() {
    this._AssignmentService.getAllExaminationType().subscribe((res) => {
      this.allExaminationType = res["data"];
    });
  }
  getExaminationLocationType() {
    this._AssignmentService.getAllExaminationLocationType().subscribe((res) => {
      this.allExaminationLocationType = res["data"];
    });
  }
  onEventLog(event) {
    this.newAssignmentForm.value.car_color = this.color;
  }
  patchingInsuranceId(event) {
    this.newAssignmentForm.value.insurance_company_id = event;
  }
  patchingExaminationId(event){
    this.newAssignmentForm.value.examination_type_id = event;
  }
  patchingExaminationLocationId(event){
    this.newAssignmentForm.value.examination_location_type_id = event;
  }
  patchingAssignedUser(event){
    this.newAssignmentForm.value.assigned_to = event;
  }

  onSubmit(newAssignmentForm: FormGroup) {
    let formData=this.newAssignmentForm.value
    delete formData.id;
    console.log(formData)
    this._AssignmentService.createNewAssignment(formData).subscribe(
      (res) => {
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(
            `${translate.ASSIGNMENT_ADDED_SUCCECFULLY}`,
            "bg-green"
          );
        });
        this._Router.navigate(["/assignment/list"]);
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
}
