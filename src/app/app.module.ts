import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TODO_URL } from 'src/consts';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface TodoConfig {
    todoUrl: string;
}

export function getTodoUrl(client: HttpClient): Observable<string> {
    return map<TodoConfig, string>(x => x.todoUrl)(client.get<TodoConfig>('/assets/config.json'));
}


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{provide: TODO_URL, useFactory: getTodoUrl, deps: [HttpClient]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
