export interface ActionSpec {
  entityLabel: string;
  action: 'create' | 'update';
  formEntity: any;
  initialValue: any | null;
}
