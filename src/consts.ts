import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const TODO_URL = new InjectionToken<Observable<string>>('TODO_URL');
