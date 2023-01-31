import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AgendaService } from './agenda.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  agendaData=[];

  options: OptionsInput;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  columns = [
    { name: "assignment.customer_name", prop: "assignment.customer_name" },
    { name: "assignment.customer_phone", prop: "assignment.customer_phone" },
    { name: "assignment.insurance_company", prop: "assignment.insurance_company" },
    { name: "assignment.contact_person_name", prop: "assignment.contact_person_name" },
    { name: "assignment.examination_type", prop: "assignment.examination_type" },
    { name: "assignment.examination_location_type", prop: "assignment.examination_location_type" },
    { name: "assignment.car_model", prop: "assignment.car_model" },
  ];
  messages = { emptyMessage: "", totalMessage: "" };


  constructor(private agendaService:AgendaService,    public translate: TranslateService,
    private _Router: Router   ) { }

  ngOnInit(): void {
    this.loadEvents()
    this.options = {
      editable: true,
      selectable: true,

      dateClick: this.onDateClick.bind(this),
      events: this.agendaData[0],
          customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function() {
            alert('clicked the custom button!');
          }
        }
      },
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      plugins: [ dayGridPlugin, interactionPlugin ]
    };
 
  }

  onDateClick(res) {
    this._Router.navigate([`agenda/agenda-details/${res.id}`]);
  }

  loadEvents() {
    this.agendaService.getAllAgenda().subscribe((res) => {
      console.log("agenda data: ",res['data'])
      
      this.agendaData=res['data'].assignment
      this.agendaData.push(res['data'].assignment)

      // for(let i=0;i<res['data'].length;i++){

      // }


      console.log(this.agendaData)
    });
  }


  eventClick(model) {
    this._Router.navigate([`agenda/agenda-details/${model.id}`]);

  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

}
