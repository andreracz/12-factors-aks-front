import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];

  selectedTodo?: Todo;

    onSelect(todo: Todo): void {
        if (this.selectedTodo === todo) {
            this.selectedTodo = undefined;
        } else {
            this.selectedTodo = todo;
        }
    }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
      this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  newTodo(): void{
    this.selectedTodo = { title: '', complete: false };
    this.todos.push(this.selectedTodo);
  }

  save(): void {
    if (this.selectedTodo) {
      this.todoService.saveTodo(this.selectedTodo).subscribe(todo => { if (this.selectedTodo) {
          this.selectedTodo.id = todo.id;
          this.selectedTodo = undefined;
        }  });
    }
  }

}
