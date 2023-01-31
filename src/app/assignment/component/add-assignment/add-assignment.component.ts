import { AssignmentService } from './../../assignment.service';
import { ClientService } from "./../../../client/client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../../user/user.service";
import { SharedService } from "./../../../shared/shared.service";
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { concat } from 'rxjs';
// import { DatePipe } from '@angular/common'

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
  allUser: any;
  allExaminationType: any;
  allExaminationLocationType: any;
  color: any;
  allCarBrands: any;
  allCarModels: any;
  allCarIssuedYears: any;
  date: any;
  userType: any;
  loader = true;

  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private sharedService: SharedService,
    private _UserService: UserService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _Router: Router,
    private _ClientService: ClientService,
    private _AssignmentService: AssignmentService,
    // public datepipe: DatePipe
  ) {
    this.userType = JSON.parse(localStorage.getItem("user details")).role;
    console.log(this.userType)
  }


  ngOnInit(): void {
    this.initForm();
    this.initForms();
    this.checkUsers()
    this.getExaminationType();
    this.getExaminationLocationType();
    this.getCarBrand();
    this.getCarIssuedYear();


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
      examination_type_id: [null, [Validators.required]],
      examination_location_type_id: [null, [Validators.required]],
      examination_location_address: [null, [Validators.required]],
      contact_person_name: [null, [Validators.required]],
      car_brand_id: [null, [Validators.required]],
      car_model_id: [null, [Validators.required]],
      car_model_issued_year: [null, [Validators.required]],
      contact_person_phone: [null, [Validators.required]],
      assigned_to: [null],
      examination_date: [null],
      examination_from_time: [null],
      examination_to_time: [null],

    });
    this.HFormGroup1 = this.formBuilder.group({
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
      car_brand_id: [null, [Validators.required]],
      car_model_id: [null, [Validators.required]],
      car_model_issued_year: [null, [Validators.required]],
      examination_type_id: [null, [Validators.required]],
      examination_location_type_id: [null, [Validators.required]],
      examination_location_address: [null, [Validators.required]],
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

  checkUsers() {
    if (this.userType === 'Super Admin') {

      this.getActiveCompany()
      this.getAgentUser();
    } else if (this.userType === 'Agent') {
      this.getActiveCompanyByAgent()
    }

  }
  getActiveCompany() {
    this._ClientService.getAllInsurance().subscribe((res) => {
      setTimeout(() => {
        this.loader = false;
      }, 500);

      if (res) {
        // hideloader();
      }

      this.allCompany = res["data"];
      this.allCompany = this.allCompany.filter(
        (company) => company.status === "active"
      );

      console.log("all companies : ", this.allCompany)

      // function hideloader() {

      //   // Setting display of spinner
      //   // element to none
      //   document.getElementById('loading').style.display = 'none';
      // }
    });
  }

  getActiveCompanyByAgent() {
    this._ClientService.getActiveCompanyByAgent().subscribe((res) => {
      this.allCompany = res["data"];
      this.allCompany = this.allCompany.filter(
        (company) => company.status === "active"
      );

      console.log("all companies2 : ", this.allCompany)

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


  getCarBrand() {
    this._AssignmentService.getAllCarsBrands().subscribe((res) => {
      this.allCarBrands = res["data"];
      console.log("car brands: ", this.allCarBrands)
    });
  }

  getCarIssuedYear() {
    this._AssignmentService.getAllCarIssuedYear().subscribe((res) => {
      this.allCarIssuedYears = res["data"];
      console.log("car issued year: ", this.allCarIssuedYears)
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
  patchingExaminationId(event) {
    this.newAssignmentForm.value.examination_type_id = event;
  }

  patchingCarBrandhId(event) {
    this.newAssignmentForm.value.car_brand_id = event;

    this._AssignmentService.getAllCarsModels(event).subscribe(res => {
      this.allCarModels = res['data']
      console.log(this.allCarModels)
    })
  }

  patchingCarModelId(event) {
    this.newAssignmentForm.value.car_model_id = event;
  }

  patchingCarIssuedYear(event) {
    this.newAssignmentForm.value.car_model_issued_year = event;
  }

  patchingExaminationLocationId(event) {
    this.newAssignmentForm.value.examination_location_type_id = event;
  }
  patchingAssignedUser(event) {
    this.newAssignmentForm.value.assigned_to = event;
  }

  onSubmit(newAssignmentForm: FormGroup) {
    let formData = this.newAssignmentForm.value;
    //     const dateTwo = new Date(new Date(this.newAssignmentForm.value.examination_date));
    //     console.log(dateTwo)
    //     var year = dateTwo.getFullYear();
    //     console.log(year)
    //     var month = dateTwo.getMonth();
    //     console.log(month)
    //     var day = dateTwo.getDay();
    //     console.log(day)

    //     const date=new Date(year, month, day)
    // formData.examination_date=date;
    //     console.log(date)
    //     this.date = new Date(year, month, day);
    // const tomorrow =  new Date(formData.examination_date.setDate(this.newAssignmentForm.value.examination_date.getDate()));
    // console.log(this.newAssignmentForm.value.examination_date)
    // let latest_date =this.datepipe.transform(this.newAssignmentForm.value.examination_date, 'yyyy-MM-dd');
    // formData.examination_date=latest_date;

    const date = new Date(this.newAssignmentForm.value.examination_date)
    console.log(date.toLocaleDateString())


    const timefrom = this.newAssignmentForm.value.examination_from_time;

    console.log(timefrom.toLocaleTimeString())
    // const hours=timefrom.getHours();
    // const minutes=timefrom.getMinutes();
    // const timeFrom = hours+':'+minutes
    // console.log(timeFrom)
    // formData.examination_from_time=timeFrom;


    const timeto = this.newAssignmentForm.value.examination_to_time;
    console.log(timeto.toLocaleTimeString())

    // const hours2=timeto.getHours();
    // const minutes2=timeto.getMinutes();
    // const timeTo = hours2+':'+minutes2
    // console.log(timeTo)

    // console.log("to date: ", new Date(this.newAssignmentForm.value.examination_to_time))
    // timeto.setDate(new Date(this.newAssignmentForm.value.examination_date))
    // console.log(timeto)

    formData.examination_date = date.toLocaleDateString();
    formData.examination_from_time = timefrom;
    formData.examination_to_time = timeto;

    formData.examination_from_time = timefrom.toLocaleTimeString();
    formData.examination_to_time = timeto.toLocaleTimeString();
    formData.car_model_issued_year = String(this.newAssignmentForm.value.car_model_issued_year)

    console.log("confirm time: ", formData.examination_to_time)
    delete formData.id;
    console.log(formData)

    if (this.userType === 'Super Admin') {
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
    } else if (this.userType === 'Agent') {
      delete formData.assigned_to;
      this._AssignmentService.createNewAssignmentAgent(formData).subscribe(
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
    } else if (this.userType === 'Insurance User') {
      delete formData.assigned_to;
      delete formData.insurance_company_id
      this._AssignmentService.createNewAssignmentInsurance(formData).subscribe(
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
    } else if (this.userType === 'Agent') {
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
}
