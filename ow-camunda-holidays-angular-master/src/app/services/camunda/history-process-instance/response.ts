import { HistoryVariableInstanceResponse } from '@services/camunda/history-variable-instance/response';

export interface HistoryProcessInstanceResponse {
  id: string;
  rootProcessInstanceId: string | null;
  superProcessInstanceId: string | null;
  superCaseInstanceId: string | null;
  caseInstanceId: string | null;
  processDefinitionName: string;
  processDefinitionKey: string;
  processDefinitionVersion: number;
  processDefinitionId: string;
  businessKey: string | null;
  startTime: string | null;
  endTime: string | null;
  removalTime: string | null;
  durationInMillis: number | null;
  startUserId: string | null;
  startActivityId: string | null;
  deleteReason: string | null;
  tenantId: string | null;
  state: string | null;
}

export interface ExtendedHistoryProcessInstance extends HistoryProcessInstanceResponse {
  variables: Array<HistoryVariableInstanceResponse>;
}
