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
  imgChangeEvt: any = "";

  imageUrl: any;
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
    const id = +this.activatedRoute.snapshot.params.id || null;
    if (id) {
      this._PreviewService.getPreviewById(id).subscribe((res) => {
        this.onePreview = res.data;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.notesForm = this.fb.group({
      id: [""],
      notes: ["", [Validators.required]],
    });
  }
  openNotesModal(image) {
    this.modalService.open(this.notesModal, { centered: true, size: "md" });
    this.image = image;
  }
  openImageModal(image) {
    this.modalService.open(this.imgModal, { centered: true, size: "lg" });
    this.image = image
    this.imageUrl = this.image.attachment_path;
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
