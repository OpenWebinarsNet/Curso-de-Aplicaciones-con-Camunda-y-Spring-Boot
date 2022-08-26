import { Component, Input, OnInit } from '@angular/core';
import { TaskResponse, VariableResponse } from '@services/camunda/task/response';
import { finalize } from 'rxjs/operators';
import { TaskService } from '@services/camunda/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@shared';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CredentialsService } from '@app/auth';

const log = new Logger('HolidayForm');

@Component({
  selector: 'app-camunda-form-holiday-request',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
})
export class HolidayFormComponent implements OnInit {
  @Input() task!: TaskResponse;
  @Input() isLoading!: boolean;
  error: string | undefined;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  rejected: boolean = false;
  variables: Array<VariableResponse> = new Array<VariableResponse>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private credentialsService: CredentialsService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.fetchVariables();
  }

  fetchVariables() {
    this.isLoading = true;
    const variables$ = this.taskService.queryVars(this.task.id);

    variables$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (variables) => {
          log.debug(`Fetched ${variables.length} variables`);
          this.variables = variables;
          if (this.variables['startDate']) {
            this.range.get('start')?.setValue(moment(this.variables['startDate'].value).toDate());
          }
          if (this.variables['endDate']) {
            this.range.get('end')?.setValue(moment(this.variables['endDate'].value).toDate());
          }
          if (this.variables['rejected'] && this.variables['rejected'].value) {
            this.rejected = true;
          }
        },
        error: (error) => {
          log.debug(`Fetching variables error: ${error.message}`);
          this.error = error.message;
        },
      });
  }

  submitForm() {
    this.isLoading = true;

    if (this.range.valid) {
      const payload = {
        variables: {
          startDate: {
            value: this.range.get('start')?.value,
          },
          endDate: {
            value: this.range.get('end')?.value,
          },
          mailTo: {
            value: this.credentialsService.userInfo.email,
          },
        },
      };

      const formSubmitted$ = this.taskService.submitForm(this.task.id, payload);

      formSubmitted$
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: () => {
            this.route.queryParams.subscribe((params) =>
              this.router.navigate([params['redirect'] || `/list`], { replaceUrl: true })
            );
          },
          error: (error) => {
            log.debug(`Form submitting error: ${error.message}`);
            this.error = error.message;
          },
        });
    }
  }
}
