import { ViewChild } from "@angular/core";
import { PreviewService } from "./../../preview.service";
import { AssignmentService } from "./../../../assignment/assignment.service";
import { ClientService } from "./../../../client/client.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../../user/user.service";
import { SharedService } from "./../../../shared/shared.service";
import { TranslateService } from "@ngx-translate/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { combineAll } from "rxjs/operators";
import { Observable, Observer } from "rxjs";
@Component({
  selector: "app-assign-preview",
  templateUrl: "./assign-preview.component.html",
  styleUrls: ["./assign-preview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignPreviewComponent implements OnInit {
  @ViewChild("notesModal") notesModal: NgbModal;
  @ViewChild("imgModal") imgModal: NgbModal;

  onePreview: any;
  imgChangeEvent: any;
  image: any;
  notesForm: FormGroup;
  discriptionForm: FormGroup;
  imgChangeEvt: any = "";
  allPhoto: any;
  updatedImageUrl: any;
  base64Image: any;
  attatchment: any = [];
  id: any;
  constructor(
    public translate: TranslateService,
    private sharedService: SharedService,
    private _UserService: UserService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private _PreviewService: PreviewService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.id = +this.activatedRoute.snapshot.params.id || null;
    if (this.id) {
      this.getPreviewData();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
  getPreviewData() {
    this._PreviewService.getPreviewById(this.id).subscribe((res) => {
      this.onePreview = res.data;
      this.attatchment = this.onePreview?.attachments;
      this.attatchment.filter((item) => {
        if (item.sub_attachments != undefined || item.sub_attachments != null) {
          let index = item.sub_attachments.length - 1;
          item.newSubAttatchment = item.sub_attachments[index]
        }
      })
      this.cdr.detectChanges();
    });
  }
  initForm() {
    this.notesForm = this.fb.group({
      id: [""],
      notes: ["", [Validators.required]],
    });
    this.discriptionForm = this.fb.group({
      id: [""],
      discription: ["", [Validators.required]],
    });
  }
  openNotesModal(image) {
    this.modalService.open(this.notesModal, { centered: true, size: "md" });
    this.image = image;
  }
  openImageModal(image) {
    this.modalService.open(this.imgModal, { centered: true, size: "lg" });
    this.image = image;
    console.log(this.image)
    if (this.image.newSubAttatchment != undefined || this.image.newSubAttatchment != undefined) {
      this.updatedImageUrl = this.image?.newSubAttatchment?.attachment_path;
    } else {
      this.updatedImageUrl = this.image.attachment_path;
    }
    // this.updatedImageUrl="https://company.z2data.com/UploadedFiles/CompanyLogo/1003280.jpg?fbclid=IwAR1dhCzXoN5OdDJNdgqZ5q3L4KgQPFcZNY8E1FAG86Ye23Z6bKotN9Jlhi8"
    // this.updatedImageUrl="http://api-claims.euro-assist.com/test/examination/attachments/2022-06-01/dCkLHBa0KmHRgteFaAYuc2lBKZlH0yQIyQm9hBdA.png"
    this.cdr.detectChanges();
  }
  getBase64ImageFromURL(url: string) {
    console.log("1", url)
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(img.src);
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(img.src);
        observer.complete();
      }
    });
  }


  likeImg(image) {
    let formData = {
      status: "like",
      _method: 'put'
    };
    this._PreviewService
      .updatePreview(this.onePreview.id, image.id, formData)
      .subscribe(
        (res) => {
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(`${translate.LIKE_OK}`, "bg-green");
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
  onSubmitDisLike(form: FormGroup, formDirective: FormGroupDirective) {
    let formValue = form.value;
    delete formValue.id;
    if (formValue.notes == "") {
      let formData = {
        status: "dislike",
        _method: 'put'

      };
      this._PreviewService
        .dislikePreview(this.onePreview.id, this.image.id, formData)
        .subscribe(
          (res) => {
            this.translate.get("VALIDATION").subscribe((translate) => {
              this.sharedService.notification(
                `${translate.DISLIKE_OK}`,
                "bg-green"
              );
            });
            this.modalService.dismissAll(this.notesModal);
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
        status: "dislike",
        notes: formValue.notes,
        _method: 'put'
      };
      this._PreviewService
        .dislikePreview(this.onePreview.id, this.image.id, formData)
        .subscribe(
          (res) => {
            this.translate.get("VALIDATION").subscribe((translate) => {
              this.sharedService.notification(
                `${translate.DISLIKE_OK}`,
                "bg-green"
              );
            });
            this.modalService.dismissAll(this.notesModal);
            formDirective.resetForm();
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
  onSubmitDiscription(form: FormGroup, formDirective: FormGroupDirective) {
    let formValue = form.value;
    delete formValue.id;
    let formData = {
      discription: formValue.discription,
    };
    this._PreviewService
      .addPreviewDiscription(this.onePreview?.assignment?.id,formData)
      .subscribe(
        (res) => {
         
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(
              `${translate.DISCRIPTION_DATA}`,
              "bg-green"
            );
          });
          form.reset();
          formDirective.resetForm();
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
  save(event) {
    let file = new File([event], 'attachment', { type: "image/png" });
    let formData = new FormData()
    formData.append('_method', 'put')
    formData.append('status', 'zoom');
    formData.append('photo', file);
    this._PreviewService
      .updatePreview(this.onePreview.id, this.image.id, formData)
      .subscribe(
        (res) => {
          this.translate.get("VALIDATION").subscribe((translate) => {
            this.sharedService.notification(`${translate.IMAGE_EDIT}`, "bg-green");
          });
          this.modalService.dismissAll(this.imgModal);
          this.getPreviewData()
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
  cancel() {
    this.modalService.dismissAll(this.imgModal);
  }


}
