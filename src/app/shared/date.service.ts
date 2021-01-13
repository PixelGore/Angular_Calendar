import { Injectable } from "@angular/core";
import * as moment from 'moment'
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DateService {
    public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())

    changeMonth(step: number) {
        const value = this.date.value.add(step, "M")
        this.date.next(value)
    }
    changeDate(date: moment.Moment) {
        const value = this.date.value.set({
            date: date.date(),
            month: date.month()
        })
        this.date.next(value)
    }
}