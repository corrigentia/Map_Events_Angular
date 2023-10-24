import { Component, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Link } from '../models/link';
import { UserTokenDTO } from '../models/userTokenDTO';
import { SessionService } from '../services/session.service';
import { RoleType } from '../models/enums/roleType';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { MatSidenav } from '@angular/material/sidenav';
import { RegisterComponent } from '../components/register/register.component';
import { EventsFormsComponent } from '../events/forms.component';

const anonymousNav: Link[] = [
  { title: "S'enregistrer", url: '', click: 'openRegister' },
];
const userNav: Link[] = [
  { title: 'Ajouter un évènement', url: '', click: 'openEvent' }, // events/add
];
const adminNav: Link[] = [
  { title: 'Ajouter un évènement', url: '', click: 'openEvent' }, // events/add
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  links!: Link[];
  logged!: boolean;
  currentUser: UserTokenDTO | undefined;

  constructor(
    private readonly sessionService: SessionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sessionService.data$.subscribe({
      next: (data) => {
        this.currentUser = data;
        this.logged = data !== undefined;
        this.links =
          this.currentUser?.role === RoleType.ADMIN
            ? adminNav
            : this.currentUser?.role === RoleType.USER
            ? userNav
            : anonymousNav;
      },
    });
  }

  logout() {
    this.sessionService.stop();
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      //width: '250px',
    });
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      //width: '250px',
    });
  }

  openEvent(): void {
    const dialogRef = this.dialog.open(EventsFormsComponent, {
      width: '650px',
    });
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}

