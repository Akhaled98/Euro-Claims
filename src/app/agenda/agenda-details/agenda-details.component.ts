import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda-details',
  templateUrl: './agenda-details.component.html',
  styleUrls: ['./agenda-details.component.scss']
})
export class AgendaDetailsComponent implements OnInit {

  agenda: any;
  updateAgendaForm: FormGroup;
  agendaId:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agendaService:AgendaService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router:Router,
    public translate: TranslateService,
    private sharedService: SharedService,
  ) { 
    this.agendaId = +this.activatedRoute.snapshot.params.id || null;
    if (this.agendaId) {
      this.agendaService.getAgendaById(this.agendaId).subscribe((res) => {
        this.agenda = res['data'];
     
        console.log("preview result: ",this.agenda)
        this.cdr.detectChanges();
        this.updateAgendaForm.get('description').setValue(this.agenda.description)
      });

    }
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.updateAgendaForm = this.formBuilder.group({
      description: [null],
      
    });
  }

  onSubmit(updateAgendaForm: FormGroup){
    let formData=updateAgendaForm.value
    this.agendaService.updateAgenda(formData,this.agendaId).subscribe(
      (res) => {
        this.translate.get("VALIDATION").subscribe((translate) => {
          this.sharedService.notification(
            `${translate.INSURANCE_UPDATED_SUCCECFULLY}`,
            "bg-green"
          );
        });
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
