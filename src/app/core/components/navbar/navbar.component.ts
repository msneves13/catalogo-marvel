import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public routes: Route[] = [];
  public show = false;
  public faBars = faBars;
  public faSearch = faSearch;

  constructor(private router: Router, private queryRouter: RouterQuery) {
    this.routes = [...this.router.config].filter(route => route.data);
  }

  public ngOnInit(): void {
    this.queryRouter.select().subscribe(() => {
      this.show = false;
    })
  }

  public toggleMenu(): void {
    this.show = !this.show;
  }
}
