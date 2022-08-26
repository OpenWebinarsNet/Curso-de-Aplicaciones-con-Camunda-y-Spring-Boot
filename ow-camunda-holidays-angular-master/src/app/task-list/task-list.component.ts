import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Logger } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList, TaskResponse, VariableResponse } from '@services/camunda/task/response';
import { TaskService } from '@services/camunda/task/task.service';

const log = new Logger('Home');

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['initiatorInfo', 'name', 'created', 'button'];
  isLoading!: boolean;
  error: string | undefined;
  tasks: Array<TaskList> = new Array<TaskList>();

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.isLoading = true;

    const tasks$ = this.taskService.query({});

    tasks$.subscribe({
      next: (tasks) => {
        log.debug(`Fetched ${tasks.length} tasks`);
        if (tasks.length === 0) {
          this.isLoading = false;
        }
        tasks.forEach((task: TaskResponse) => {
          this.taskService
            .queryVar(task.id, 'initiatorInfo')
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe({
              next: (variable: VariableResponse) => {
                const extendedTask: TaskList = {
                  id: task.id,
                  processInstanceId: task.processInstanceId,
                  assignee: task.assignee,
                  formKey: task.formKey,
                  name: task.name,
                  created: task.created,
                  initiatorInfo: variable.value,
                };
                this.tasks.push(extendedTask);
              },
            });
        });
      },
      error: (error) => {
        log.debug(`Login error: ${error.message}`);
        this.error = error.message;
      },
    });
  }

  continueForm() {}
}
