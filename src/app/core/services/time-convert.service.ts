import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeConvertService {

  constructor() { }

  secondstoHHMMSS(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    const seconds: number = Math.floor(value % 60);

    const hoursDisplay = hours.toString().padStart(2, '0');
    const minutesDisplay = minutes.toString().padStart(2, '0');
    const secondsDisplay = seconds.toString().padStart(2, '0');

    return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
}


}
