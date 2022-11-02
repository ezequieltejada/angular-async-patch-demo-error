import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

export class BusinessIdValidator {
  static validator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(
        control.value === 'test-name' ? { businessIdAlreadyUsed: true } : null
      );
    };
  }
}
