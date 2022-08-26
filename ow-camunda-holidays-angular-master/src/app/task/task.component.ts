import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Logger } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskResponse } from '@services/camunda/task/response';
import { TaskService } from '@services/camunda/task/task.service';

const log = new Logger('Home');

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  isLoading!: boolean;
  error: string | undefined;
  processInstanceId!: string | null;
  task!: TaskResponse;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.processInstanceId = params.get('processInstanceId');
      this.fetchTask();
    });
  }

  fetchTask() {
    this.isLoading = true;
    const task$ = this.taskService.query({ processInstanceId: this.processInstanceId });

    task$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (tasks) => {
          log.debug(`Fetched ${tasks.length} tasks`);
          this.task = tasks[0];
        },
        error: (error) => {
          log.debug(`Login error: ${error.message}`);
          this.error = error.message;
        },
      });
  }
}
