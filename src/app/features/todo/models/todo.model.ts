export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  piority: PiorityEnum
}

export enum PiorityEnum {
  Low = 'low',
  Normal = 'normal',
  High = 'high'
}