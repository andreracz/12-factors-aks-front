import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TODO_URL } from 'src/consts';
import { Todo } from './model/todo';
import {concatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

    private todoUrl = '';

    constructor(private http: HttpClient,  @Inject(TODO_URL) private todoUrlObs: Observable<string>) {

    }

    public getTodos(): Observable<Todo[]> {
        if (this.todoUrl !== '') {
            return this.http.get<Todo[]>(this.todoUrl);
        } else {
            return this.todoUrlObs.pipe(concatMap(url => {
                this.todoUrl = url;
                return this.http.get<Todo[]>(this.todoUrl);
            }));
        }
    }

    public saveTodo(todo: Todo): Observable<Todo> {
        if (todo.id) {
            return this.http.put<Todo>(this.todoUrl + '/' + todo.id, todo);
        } else {
            return this.http.post<Todo>(this.todoUrl , todo);
        }
    }

}
