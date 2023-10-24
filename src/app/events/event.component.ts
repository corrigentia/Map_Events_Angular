import { Component, Inject } from '@angular/core';
import { EventService } from '../services/api/events.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  datasEvent: any = {};
  model: any = { limit: 5 };
  id!: number;

  constructor(
    private eventServe: EventService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<EventComponent>
  ) {
    this.eventServe.getEventById(data.id, this.model).subscribe({
      next: (datas: any) => {
        this.datasEvent = datas;
        console.log(this.datasEvent);
      },
      error: (e) => console.error(e),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
