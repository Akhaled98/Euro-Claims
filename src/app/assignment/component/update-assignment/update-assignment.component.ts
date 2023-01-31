import { AssignmentService } from './../../assignment.service';
import { ClientService } from './../../../client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../user/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.scss']
})
export class UpdateAssignmentComponent implements OnInit {

  newAssignmentForm: FormGroup;
  passwordFlag: boolean = false;
  oneAssignment: any;
  insuranceCompanyFlag: boolean = false;
  allCompany: any;
  loader = true;
  allUser:any;
  allExaminationType: any;
  allExaminationLocationType:any;
  color: any;
  allCarBrands:any;
  allCarModels:any;
  allCarIssuedYears:any;
someTime:any;
userType: any;

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
  ) {
    this.userType = JSON.parse(localStorage.getItem("user details")).role;
    this.someTime=new Date('Sept 24, 22 13:20:18')
    console.log(this.someTime)
    const id = +this.activatedRoute.snapshot.params.id || null;
    if (id) {

      if (this.userType === 'Super Admin') {
        this._AssignmentService.getAssignmentById(id).subscribe((res) => {
        this.oneAssignment = res.data;
        console.log(this.oneAssignment)
        console.log(new Date(this.oneAssignment.examination_from_time).getHours())
        this.getCarModel(this.oneAssignment.car_brand.id);
        console.log(this.oneAssignment.car_brand_id)

          this.newAssignmentForm.patchValue(res.data);
          this.newAssignmentForm.get('assigned_to').setValue(this.oneAssignment.assigned_to.id);
          this.newAssignmentForm.get('customer_name').setValue(this.oneAssignment.customer_name);
          this.newAssignmentForm.get('customer_phone').setValue(this.oneAssignment.customer_phone);
          this.newAssignmentForm.get('customer_address').setValue(this.oneAssignment.customer_address);
          this.newAssignmentForm.get('insurance_company_id').setValue(this.oneAssignment.insurance_company_id);
          this.newAssignmentForm.get('car_brand_id').setValue(this.oneAssignment.car_brand.id);
          this.newAssignmentForm.get('car_document_number').setValue(this.oneAssignment.car_document_number);
          this.newAssignmentForm.get('car_vin_decoder').setValue(this.oneAssignment.car_vin_decoder);
          this.newAssignmentForm.get('car_plate_number').setValue(this.oneAssignment.car_plate_number);
          this.newAssignmentForm.get('car_engine_number').setValue(this.oneAssignment.car_engine_number);
          this.newAssignmentForm.get('car_color').setValue(this.oneAssignment.car_color);
          this.newAssignmentForm.get('car_model_id').setValue(this.oneAssignment.car_mode.id);
          this.newAssignmentForm.get('examination_type_id').setValue(this.oneAssignment.examination_type_id);
          this.newAssignmentForm.get('examination_location_type_id').setValue(this.oneAssignment.examination_location_type_id);
          this.newAssignmentForm.get('examination_location_address').setValue(this.oneAssignment.examination_location_address);
          this.newAssignmentForm.get('contact_person_name').setValue(this.oneAssignment.contact_person_name);
          this.newAssignmentForm.get('contact_person_phone').setValue(this.oneAssignment.contact_person_phone);
          this.newAssignmentForm.get('assigned_to').setValue(this.oneAssignment.assigned_to.name);
          this.newAssignmentForm.get('examination_date').setValue(this.oneAssignment.examination_date);
         
          this.newAssignmentForm.get('examination_from_time').setValue(this.oneAssignment.examination_from_time)
          this.newAssignmentForm.get('examination_to_time').setValue(this.oneAssignment.examination_to_time);
          
          this.newAssignmentForm.get('car_model_issued_year').setValue(this.oneAssignment.car_model_issued_year);
      
      
  
      })
    }

    if (this.userType === 'Agent') {
      this._AssignmentService.getAssignmentAgentById(id).subscribe((res) => {
      this.oneAssignment = res.data;
      console.log("assignment data: ",res.data)
      console.log(new Date(this.oneAssignment.examination_from_time).getHours())
      this.getCarModel(this.oneAssignment.car_brand.id);
      this.getActiveCompanyByAgent()
      console.log(this.oneAssignment.car_brand.id)

        this.newAssignmentForm.patchValue(res.data);
        this.newAssignmentForm.get('assigned_to').setValue(this.oneAssignment.assigned_to.id);
        this.newAssignmentForm.get('customer_name').setValue(this.oneAssignment.customer_name);
        this.newAssignmentForm.get('customer_phone').setValue(this.oneAssignment.customer_phone);
        this.newAssignmentForm.get('customer_address').setValue(this.oneAssignment.customer_address);
        this.newAssignmentForm.get('insurance_company_id').setValue(this.oneAssignment.insurance_company_id);
        this.newAssignmentForm.get('car_brand_id').setValue(this.oneAssignment.car_brand.id);
        this.newAssignmentForm.get('car_document_number').setValue(this.oneAssignment.car_document_number);
        this.newAssignmentForm.get('car_vin_decoder').setValue(this.oneAssignment.car_vin_decoder);
        this.newAssignmentForm.get('car_plate_number').setValue(this.oneAssignment.car_plate_number);
        this.newAssignmentForm.get('car_engine_number').setValue(this.oneAssignment.car_engine_number);
        this.newAssignmentForm.get('car_color').setValue(res.data.car_color);
        this.newAssignmentForm.get('car_model_id').setValue(this.oneAssignment.car_mode.id);
        this.newAssignmentForm.get('examination_type_id').setValue(this.oneAssignment.examination_type_id);
        this.newAssignmentForm.get('examination_location_type_id').setValue(this.oneAssignment.examination_location_type_id);
        this.newAssignmentForm.get('examination_location_address').setValue(this.oneAssignment.examination_location_address);
        this.newAssignmentForm.get('contact_person_name').setValue(this.oneAssignment.contact_person_name);
        this.newAssignmentForm.get('contact_person_phone').setValue(this.oneAssignment.contact_person_phone);
        // this.newAssignmentForm.get('assigned_to').setValue(this.oneAssignment.assigned_to.name);
        this.newAssignmentForm.get('examination_date').setValue(this.oneAssignment.examination_date);
       
        this.newAssignmentForm.get('examination_from_time').setValue(this.oneAssignment.examination_from_time)
        this.newAssignmentForm.get('examination_to_time').setValue(this.oneAssignment.examination_to_time);
        this.newAssignmentForm.get('car_model_issued_year').setValue(this.oneAssignment.car_model_issued_year);
    })
  }
else if (this.userType === 'Insurance User') {
  this._AssignmentService.getAssignmentInsuranceById(id).subscribe((res) => {
    this.oneAssignment = res.data;
    console.log("assignment data: ",res.data)
    console.log(new Date(this.oneAssignment.examination_from_time).getHours())
    this.getCarModel(this.oneAssignment.car_brand.id);
    this.getActiveCompanyByAgent()
    console.log(this.oneAssignment.car_brand.id)

      this.newAssignmentForm.patchValue(res.data);
      this.newAssignmentForm.get('assigned_to').setValue(this.oneAssignment.assigned_to.id);
      this.newAssignmentForm.get('customer_name').setValue(this.oneAssignment.customer_name);
      this.newAssignmentForm.get('customer_phone').setValue(this.oneAssignment.customer_phone);
      this.newAssignmentForm.get('customer_address').setValue(this.oneAssignment.customer_address);
      // this.newAssignmentForm.get('insurance_company_id').setValue(this.oneAssignment.insurance_company_id);
      this.newAssignmentForm.get('car_brand_id').setValue(this.oneAssignment.car_brand.id);
      this.newAssignmentForm.get('car_document_number').setValue(this.oneAssignment.car_document_number);
      this.newAssignmentForm.get('car_vin_decoder').setValue(this.oneAssignment.car_vin_decoder);
      this.newAssignmentForm.get('car_plate_number').setValue(this.oneAssignment.car_plate_number);
      this.newAssignmentForm.get('car_engine_number').setValue(this.oneAssignment.car_engine_number);
      this.newAssignmentForm.get('car_color').setValue(res.data.car_color);
      this.newAssignmentForm.get('car_model_id').setValue(this.oneAssignment.car_mode.id);
      this.newAssignmentForm.get('examination_type_id').setValue(this.oneAssignment.examination_type_id);
      this.newAssignmentForm.get('examination_location_type_id').setValue(this.oneAssignment.examination_location_type_id);
      this.newAssignmentForm.get('examination_location_address').setValue(this.oneAssignment.examination_location_address);
      this.newAssignmentForm.get('contact_person_name').setValue(this.oneAssignment.contact_person_name);
      this.newAssignmentForm.get('contact_person_phone').setValue(this.oneAssignment.contact_person_phone);
      // this.newAssignmentForm.get('assigned_to').setValue(this.oneAssignment.assigned_to.name);
      this.newAssignmentForm.get('examination_date').setValue(this.oneAssignment.examination_date);
     
      this.newAssignmentForm.get('examination_from_time').setValue(this.oneAssignment.examination_from_time)
      this.newAssignmentForm.get('examination_to_time').setValue(this.oneAssignment.examination_to_time);
      this.newAssignmentForm.get('car_model_issued_year').setValue(this.oneAssignment.car_model_issued_year);
  })
}
  
      

      function hideloader() {
  
        // Setting display of spinner
        // element to none
        document.getElementById('loading').style.display = 'none';
    }
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.checkUsers();
    this.getExaminationType();
    this.getExaminationLocationType();
    this.getAgentUser();
    this.getCarBrand();
    this.getCarIssuedYear()
  }

  checkUsers() {
    if (this.userType === 'Super Admin') {

      this.getActiveCompany()
      this.getAgentUser();
    } else if (this.userType === 'Agent') {
      this.getActiveCompanyByAgent()
    }

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
      car_model_id: [null, [Validators.required]],
      examination_type_id:[null,[Validators.required]],
      examination_location_type_id:[null,[Validators.required]],
      examination_location_address:[null,[Validators.required]],
      contact_person_name: [null, [Validators.required]],
      contact_person_phone: [null, [Validators.required]],
      assigned_to: [null,[Validators.required]],
      examination_date: [null,[Validators.required]],
      examination_from_time: [null,[Validators.required]],
      examination_to_time: [null,[Validators.required]],
      car_brand_id: [null, [Validators.required]],
      car_model_issued_year:[null, [Validators.required]]
    });
  }
  getActiveCompany() {
    this._ClientService.getAllInsurance().subscribe((res) => {
      this.cdr.detectChanges();
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

      console.log(this.allUser)
    });
  }

  getCarBrand() {
    this._AssignmentService.getAllCarsBrands().subscribe((res) => {
      this.allCarBrands = res["data"];
      console.log("car brands: ",this.allCarBrands)
    });
  }

  getCarIssuedYear(){
    this._AssignmentService.getAllCarIssuedYear().subscribe((res) => {
      this.allCarIssuedYears = res["data"];
      console.log("car issued year: ",this.allCarIssuedYears)
    });
  }

  getCarModel(brand_id) {
    console.log("لاbrand id:", this.oneAssignment?.car_brand.id)
    this._AssignmentService.getAllCarsModels(brand_id).subscribe((res) => {
      this.allCarModels = res["data"];
      console.log("car models: ",this.allCarModels)
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

  patchingCarBrandhId(event){
    this.newAssignmentForm.value.car_brand_id = event;

    this._AssignmentService.getAllCarsModels(event).subscribe(res=>{
      this.allCarModels=res['data']
      console.log(this.allCarModels)
    })
  }



  patchingCarModelId(event){
    this.newAssignmentForm.value.car_model_id = event;
  }

  patchingCarIssuedYear(event){
    this.newAssignmentForm.value.car_model_issued_year = event;
  }

  onSubmit(newAssignmentForm: FormGroup) {
    let formData=this.newAssignmentForm.value
    delete formData.id;
    console.log(formData)
    if (this.userType === 'Super Admin') {
    this._AssignmentService.updateAssignment(formData,this.oneAssignment.id).subscribe(
      (res) => {
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(
            `${translate.INSURANCE_UPDATED_SUCCECFULLY}`,
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
    this._AssignmentService.updateAssignmentAgent(formData,this.oneAssignment.id).subscribe(
      (res) => {
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(
            `${translate.INSURANCE_UPDATED_SUCCECFULLY}`,
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
    this._AssignmentService.updateAssignmentAgent(formData,this.oneAssignment.id).subscribe(
      (res) => {
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(
            `${translate.INSURANCE_UPDATED_SUCCECFULLY}`,
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
