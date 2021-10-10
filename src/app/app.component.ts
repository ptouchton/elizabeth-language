import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, from, of, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = 'elizabeth-language';

  private plainInputSubject = new BehaviorSubject<string[]>(['Welcome']);
  plainInput$ = this.plainInputSubject.asObservable();
  
  translatedOutput$ = this.plainInput$
  .pipe(
    map((val) => val.map((i: any) => `e${i}th`)),
    map((val) => val.join(' ')),
    tap(val => console.log(val))
  );


  vm$ = combineLatest([
    this.plainInput$,
    this.translatedOutput$,
  ])
    .pipe(
      map(([plainInput, translatedOutput]) =>
        ({ plainInput, translatedOutput }))
    );

    onChange(input: any) {
      const arr = input.split(' ');
      this.plainInputSubject.next(arr);
    }  

    onClear(){
      this.plainInputSubject.next([]);
    }
  
}
