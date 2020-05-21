import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  show = false;

  container = 'main-container';
  sideMenu = 'sidebar-closed';
  sbarOpen = 'sbar-open';

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  toggleSideMenu() {
    this.show = !this.show;
    if (this.show) {
      this.elRef.nativeElement.parentElement.classList.add(this.sideMenu, this.container, this.sbarOpen);
    } else {
      this.elRef.nativeElement.parentElement.classList.remove(this.sideMenu, this.container, this.sbarOpen);
    }
  }

}
