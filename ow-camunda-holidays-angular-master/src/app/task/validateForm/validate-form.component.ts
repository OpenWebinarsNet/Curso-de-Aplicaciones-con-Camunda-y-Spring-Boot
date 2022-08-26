import { Component, Input, OnInit } from '@angular/core';
import { TaskResponse, VariableResponse } from '@services/camunda/task/response';
import { finalize } from 'rxjs/operators';
import { TaskService } from '@services/camunda/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@shared';
import * as moment from 'moment';
import { CredentialsService } from '@app/auth';
import { FormControl } from '@angular/forms';

const log = new Logger('HolidayForm');

@Component({
  selector: 'app-camunda-form-validate-request',
  templateUrl: './validate-form.component.html',
  styleUrls: ['./validate-form.component.scss'],
})
export class ValidateFormComponent implements OnInit {
  @Input() task!: TaskResponse;
  @Input() isLoading!: boolean;
  error: string | undefined;
  variables: Array<VariableResponse> = new Array<VariableResponse>();
  startDate!: moment.Moment;
  endDate!: moment.Moment;
  validateOptions = new FormControl();

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
          this.startDate = moment(this.variables['startDate'].value);
          this.endDate = moment(this.variables['endDate'].value);
        },
        error: (error) => {
          log.debug(`Fetching variables error: ${error.message}`);
          this.error = error.message;
        },
      });
  }

  submitForm() {
    this.isLoading = true;

    if (this.validateOptions.valid) {
      const payload = {
        variables: {
          rejected: {
            value: this.validateOptions.value === 'reject',
          },
          denied: {
            value: this.validateOptions.value === 'deny',
          },
          accepted: {
            value: this.validateOptions.value === 'accept',
          },
          mailFrom: {
            value: this.credentialsService.userInfo.email,
          },
          mailSubject: {
            value: 'Solicitud de vacaciones aprobada.',
          },
          validatorInfo: {
            value: `${this.credentialsService.userInfo.firstName} ${this.credentialsService.userInfo.lastName}`,
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
