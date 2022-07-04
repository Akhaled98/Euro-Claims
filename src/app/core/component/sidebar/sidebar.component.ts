import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile/profile.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  public parentId = "";
  profileData: any;

  
  clickedMenu(event) {
    var target = event.currentTarget;
    let parentId = target.id;
    if (parentId == this.parentId) {
      this.parentId = "";
    } else {
      this.parentId = target.id;
    }
  }
  
    


    constructor(private _ProfileServiceL: ProfileService,
      private cdr: ChangeDetectorRef) {
    
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
    this.getProfileData();
    this.cdr.detectChanges()



   
    
  }
  getProfileData() {
    this._ProfileServiceL.getProfileData().subscribe((res: any) => {
      this.profileData = res.data;
    });
  }

}
