import { Component } from '@angular/core';
import { EventService } from '../services/api/events.service';
import { MatDialog } from '@angular/material/dialog';
import { EventComponent } from './event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  datasEvents: any = {};
  model: any = { limit: 5 };

  constructor(private eventServe: EventService, public dialog: MatDialog) {
    this.eventServe.getEvents(this.model).subscribe({
      next: (datas: any) => {
        this.datasEvents = datas;
      },
      error: (e) => console.error(e),
    });
  }

  next(url: string) {
    //console.log(url);
    this.eventServe.next(url).subscribe((datas: any) => {
      this.datasEvents = datas;
    });
  }

  previous(url: string) {
    //console.log(url);
    this.eventServe.previous(url).subscribe((datas: any) => {
      this.datasEvents = datas;
    });
  }

  openEvent(id: number): void {
    const dialogRef = this.dialog.open(EventComponent, {
      width: '650px',
      data: { id: id },
    });
  }

  /*
  getImg(url: string) {
    this.eventServe.getImg(url).subscribe((datas: any) => {
      this.imgCurrentPoke = datas.sprites.other.dream_world.front_default;
    });
  }
  */
}
