import { NewUserComponent } from "./components/new-user/new-user.component";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "../authentication/service/auth.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  showUserOptions: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._AuthService.showUserOptions.subscribe(() => {
      if (this._AuthService.showUserOptions.getValue() == false) {
        this.showUserOptions = false;
      } else {
        this.showUserOptions = true;
      }
    });
  }
}
