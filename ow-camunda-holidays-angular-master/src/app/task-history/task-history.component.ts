import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Logger } from '@shared';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryProcessInstanceService } from '@services/camunda/history-process-instance/history-process-instance.service';
import { CredentialsService } from '@app/auth';
import { faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import { HistoryProcessInstanceResponse } from '@services/camunda/history-process-instance/response';
import { HistoryVariableInstanceService } from '@services/camunda/history-variable-instance/history-variable-instance.service';
import { HistoryVariableInstanceResponse } from '@services/camunda/history-variable-instance/response';
import * as moment from 'moment';

const log = new Logger('Home');

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss'],
})
export class TaskHistoryComponent implements OnInit {
  faUmbrellaBeach = faUmbrellaBeach;
  isLoading!: boolean;
  error: string | undefined;
  instances: Array<HistoryProcessInstanceResponse> = new Array<HistoryProcessInstanceResponse>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private credentialsService: CredentialsService,
    private historyProcessInstanceService: HistoryProcessInstanceService,
    private historyVariableInstanceService: HistoryVariableInstanceService
  ) {}

  ngOnInit() {
    this.fetchHistoryProcessInstances();
  }

  fetchHistoryProcessInstances() {
    this.isLoading = true;

    const payload = {
      startedBy: this.credentialsService.userInfo.id,
      completed: true,
    };

    const instances$ = this.historyProcessInstanceService.query(payload);

    instances$.subscribe({
      next: (instances) => {
        log.debug(`Fetched ${instances.length} instances`);
        if (instances.length === 0) {
          this.isLoading = false;
        }
        instances.forEach((instance: HistoryProcessInstanceResponse) => {
          const payload = {
            processInstanceId: instance.id,
          };

          this.historyVariableInstanceService
            .query(payload)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe({
              next: (variables: Array<HistoryVariableInstanceResponse>) => {
                instance['startTime'] = moment(instance.startTime).format('DD/MM/YYYY HH:mm:ss');
                instance['endTime'] = moment(instance.endTime).format('DD/MM/YYYY HH:mm:ss');
                instance['initiatorInfo'] = variables.find((v) => v['name'] === 'initiatorInfo')?.value || null;
                instance['initiatorEmail'] = variables.find((v) => v['name'] === 'mailTo')?.value || null;
                instance['validatorInfo'] = variables.find((v) => v['name'] === 'validatorInfo')?.value || null;
                instance['validatorEmail'] = variables.find((v) => v['name'] === 'mailFrom')?.value || null;
                instance['holidayFrom'] = moment(variables.find((v) => v['name'] === 'startDate')?.value) || null;
                instance['holidayTo'] = moment(variables.find((v) => v['name'] === 'endDate')?.value) || null;
                instance['approved'] = variables.find((v) => v['name'] === 'accepted')?.value || null;
                this.instances.push(instance);
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
