import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


export interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTimeLeft?: boolean;
}

@Injectable()

export class TimerService {

  constructor() { }

  private createTimeObject(tokenExpiry: any): Time {

    const now = new Date().getTime();
    const duration = (tokenExpiry * 1000) - now;
    let time: Time = {days: 0, hours: 0, minutes: 0, seconds: 0};

    time.days = Math.floor(duration / (1000 * 60 * 60 * 24));
    time.hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    time.minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    time.seconds = Math.floor((duration % (1000 * 60)) / 1000);
    if (duration > 0) {
      time.isTimeLeft = true;
    } else {
      time.isTimeLeft = false;
    }
    return time;
  }

  timer(date: Date): Observable<Time> {
      return timer(0, 1000)
        .pipe(map(() => this.createTimeObject(date)));
  }
}
