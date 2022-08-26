export interface HistoryVariableInstanceResponse {
  type: string;
  value: string;
  valueInfo: object | null;
  id: string | null;
  name: string;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  activityInstanceId: string | null;
  caseDefinitionKey: string | null;
  caseDefinitionId: string | null;
  caseInstanceId: string | null;
  caseExecutionId: string | null;
  taskId: string | null;
  errorMessage: string | null;
  tenantId: string | null;
  state: string | null;
  createTime: string | null;
  removalTime: string | null;
  rootProcessInstanceId: string | null;
}
