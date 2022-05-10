import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  public parentId = "";
  showAdminUserOptions: boolean = false;
  showUserOptions: boolean = false;

  clickedMenu(event) {
    var target = event.currentTarget;
    let parentId = target.id;
    if (parentId == this.parentId) {
      this.parentId = "";
    } else {
      this.parentId = target.id;
    }
  }
  
    
    constructor(private _AuthService: AuthService,private cdr: ChangeDetectorRef) {
    
   }
  ngOnInit() {
    const body = document.querySelector('body');
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });

    this._AuthService.showAdminUserOptions.subscribe(() => {
      if (this._AuthService.showAdminUserOptions.getValue() == false) {
        this.showAdminUserOptions = false;
      } else {
        this.showAdminUserOptions = true;
      }
      
    });
    // this._AuthService.showUserOptions.subscribe(() => {
    //   if (this._AuthService.showUserOptions.getValue() == true) {
    //     this.showUserOptions = true;
    //   } else {
    //     this.showUserOptions = false;
    //   }
    //   this.cdr.detectChanges();
    // });
  }

}
