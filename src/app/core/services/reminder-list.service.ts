import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ReminderList } from "../reminder-list/model/reminder-list.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReminderListService {
    private apiRootUrl = `${environment.apiPort}/reminder-list`;

    constructor(private http: HttpClient) {}

    getReminderList(): Observable<ReminderList[]> {
        return this.http.get<ReminderList[]>(this.apiRootUrl);
    }

    getReminderListById(id: string): Observable<ReminderList> {
        return this.http.get<ReminderList>(`${this.apiRootUrl}/${id}`);
    }

    createReminderList(reminderList: ReminderList): Observable<number> {
        return this.http.post<number>(`${this.apiRootUrl}`, reminderList);
    }

    updateReminderList(reminderList: ReminderList): Observable<any> {
        return this.http.put<any>(`${this.apiRootUrl}`, reminderList);
    }

    deleteReminderList(id: string): Observable<any> {
        return this.http.delete(`${this.apiRootUrl}/${id}`);
    }
}