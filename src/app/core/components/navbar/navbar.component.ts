import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public routes: Route[] = [];
  constructor(private router: Router) {
    this.routes = [...this.router.config].filter(route => route.data);
  }

  ngOnInit() {}
}
