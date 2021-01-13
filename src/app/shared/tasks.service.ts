import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TasksService {
    static url = 'https://angular-practice-calenda-a8dfe-default-rtdb.firebaseio.com/'

    constructor(private http: HttpClient) {

    }


    load(date: moment.Moment):Observable<Task[]> {
        return this.http
            .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(map(tasks => {
                if (!tasks) {
                    return []
                }
                return Object.keys(tasks).map(key => ({ ...tasks[key], id: key }))
            }))
    }

    create(task: Task): Observable<Task> {
        return this.http
            .post<createResponse>(`${TasksService.url}/${task.date}.json`, task)
            .pipe(map(res => {
                return { ...task, id: res.name }
            }))
    }

    remove(task: Task):Observable<void> {
        return this.http
        .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
    }
}

export interface Task {
    id?: string
    title: string
    date?: string
}
interface createResponse {
    name: string
}