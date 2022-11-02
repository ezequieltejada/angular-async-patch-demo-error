import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, map, SubscriptionLike, tap } from 'rxjs';
import { BusinessIdValidator } from './businessId.validator';
import urlSlug from 'url-slug';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular ' + VERSION.major;

  subscriptions$: SubscriptionLike[] = [];

  form = this.fb.group({
    businessName: ['', [Validators.required]],
    businessSlug: ['', [], [BusinessIdValidator.validator()]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.subscriptions$.push(
      this.form
        .get('businessName')
        .valueChanges.pipe(
          filter(Boolean),
          tap(() => this.form.get('businessSlug').reset()),
          map((value) => urlSlug(value))
        )
        .subscribe({
          next: (value) => {
            this.form.get('businessSlug').setValue(value);
            // this.form.get('businessSlug').markAsDirty();
            // this.form.get('businessSlug').updateValueAndValidity();
          },
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
  }
}
