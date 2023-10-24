import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../validators/email.validator';
import { confirmPasswordValidator } from '../validators/confirmPassword.validator';
import { ThemePalette } from '@angular/material/core';
import {
  ParentErrorStateMatcher,
  PasswordValidator,
} from '../validators/password.validator';
import { EventCategoriesService } from '../services/api/events_categories.service';
import { EventService } from '../services/api/events.service';
import { Router } from '@angular/router';
import { UserTokenDTO } from '../models/userTokenDTO';
import { SessionService } from '../services/session.service';
import { MapGeocoder } from '@angular/google-maps';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class EventsFormsComponent {
  myForm: FormGroup = new FormGroup({});
  datasEvents_categories: any = {};

  constructor(
    private fb: FormBuilder,
    private eventCategoriesServe: EventCategoriesService,
    private eventServe: EventService,
    private sessionServe: SessionService,
    private readonly router: Router,
    private geocoder: MapGeocoder,
    public dialogRef: MatDialogRef<EventsFormsComponent>
  ) {
    // Get categories
    this.eventCategoriesServe.getEvents_Categories().subscribe({
      next: (datas: any) => {
        this.datasEvents_categories = datas;
      },
      error: (e) => console.error(e),
    });
    // Create form
    this.myForm = this.fb.group(
      {
        eventname: [
          '',
          [
            Validators.minLength(3),
            Validators.maxLength(30),
            Validators.required,
          ],
        ],
        categid: ['', [Validators.required]],
        begindate: ['', [Validators.required]],
        enddate: ['', [Validators.required]],
        description: [
          '',
          [
            Validators.minLength(6),
            Validators.maxLength(255),
            Validators.required,
          ],
        ],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        city: ['', [Validators.required]],
        prixtvac: [
          '',
          [Validators.min(1), Validators.max(999), Validators.required],
        ],
        weburl: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
            ),
          ],
        ],
        coordx: ['', [Validators.required]],
        coordy: ['', [Validators.required]],
        status: ['', [Validators.required]],
        peoples: [[sessionServe.data?.id]],

        //email: ['', [emailValidator]],
      }
      /*
      {
        //validators: confirmPasswordValidator,
      }
      */
    );
  }

  /*
  getErrorMessage() {
    if (this.eventname.hasError('required')) {
      return 'You must enter a value';
    }
  }
  */

  onSubmit() {
    this.seeMyForm();
    if (this.myForm.invalid) {
      return;
    }
    /*
    this.geocoder
      .geocode({
        address:
          this.myForm.value.street +
          ' ' +
          this.myForm.value.number +
          ' ' +
          this.myForm.value.city,
      })
      .subscribe(({ results }) => {
        //console.log(results[0].geometry.location.lat);
        const location = results[0];
        const loc: any = location.geometry.location;
        let locationCoords = new google.maps.LatLng(loc.lat, loc.lng);
        let lat = locationCoords.lat();
        let lng = locationCoords.lng();
        console.log(lat);
        // prendre alors le max et min et recalculer la bonne position...
      });
    */

    this.eventServe.insert(this.myForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['']);
      },
    });
    this.dialogRef.close();
  }

  seeMyForm() {
    console.log(this.myForm.value);
  }
}
