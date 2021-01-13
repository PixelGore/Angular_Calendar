import { DateService } from '../../shared/date.service'
import { Component, OnInit } from '@angular/core';
import *as moment from 'moment'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[]

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1, 'd')

    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'd').clone()
            const active = moment().isSame(value, 'd')
            const disabled = !now.isSame(value, 'month')
            const selected = now.isSame(value, 'd')
            return {
              value,
              active,
              disabled,
              selected
            }
          })
      })
    }
    this.calendar = calendar
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day)
  }
}

interface Week {
  days: Day[]
}
interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}