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
  onePreview: any;
  // imgChangeEvent:any;
  image: any;
  notesForm: FormGroup;

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
  likeImg(image) {
    let formData = {
      status: "like",
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
      };
      this._PreviewService
        .updatePreview(this.onePreview.id, this.image.id, formData)
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
      };
      this._PreviewService
        .updatePreview(this.onePreview.id, this.image.id, formData)
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

  // cropImg(event){}
}
