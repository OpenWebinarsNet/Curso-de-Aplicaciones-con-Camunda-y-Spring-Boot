export interface TaskResponse {
  id: string;
  processInstanceId: string;
  name: string;
  assignee: string | null;
  formKey: string | null;
  created: Date;
}

export interface TaskList extends TaskResponse {
  initiatorInfo: string;
}

export interface VariableResponse {
  type: string;
  value: any;
  valueInfo: any;
}
