import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  show: boolean = false;
  expanded: boolean = false;

  show1: boolean = false;
  expanded1: boolean = false;

  package: boolean = false;
  expandedPackage: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  getShow() {
    this.show = !this.show;
    this.expanded = !this.expanded;
  }

  getShow1() {
    this.show1 = !this.show1;
    this.expanded1 = !this.expanded1;
  }

  getPackage() {
    this.package = !this.package;
    this.expandedPackage = !this.expandedPackage;
  }
}
