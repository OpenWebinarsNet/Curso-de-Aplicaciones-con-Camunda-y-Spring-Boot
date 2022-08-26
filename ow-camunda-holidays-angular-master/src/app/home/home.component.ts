import { Component, OnInit } from '@angular/core';
import { ProcessDefinitionService } from '@services/camunda/process-definition/process-definition.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '@shared';
import { ProcessDefinitionResponse } from '@services/camunda/process-definition/response';
import { faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/auth';

const log = new Logger('Home');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading!: boolean;
  error: string | undefined;
  definitions: Array<ProcessDefinitionResponse> | null = new Array<ProcessDefinitionResponse>();
  faUmbrellaBeach = faUmbrellaBeach;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private credentialsService: CredentialsService,
    private processDefinitionService: ProcessDefinitionService
  ) {}

  ngOnInit() {
    this.fetchDefinitions();
  }

  fetchDefinitions() {
    this.isLoading = true;
    const definitions$ = this.processDefinitionService.query();

    definitions$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (definitions) => {
          log.debug(`Fetched ${definitions.length} process definitions`);
          this.definitions = definitions;
        },
        error: (error) => {
          log.debug(`Login error: ${error.message}`);
          this.error = error.message;
        },
      });
  }

  startInstance(definitionKey: string) {
    this.isLoading = true;
    const payload = {
      variables: {
        userDepartment: {
          value: this.credentialsService.userInfo.roles[0].id,
        },
        initiatorInfo: {
          value: `${this.credentialsService.userInfo.firstName} ${this.credentialsService.userInfo.lastName}`,
        },
      },
    };

    const instance$ = this.processDefinitionService.start(definitionKey, payload);

    instance$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (instance) => {
          this.route.queryParams.subscribe((params) =>
            this.router.navigate([params['redirect'] || `/task/${instance.id}`], { replaceUrl: true })
          );
        },
        error: (error) => {
          log.debug(`Login error: ${error.message}`);
          this.error = error.message;
        },
      });
  }
}
