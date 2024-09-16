import { PiorityEnum } from "@features/todo/models/todo.model";

export const PRIORITY_OPTIONS = [
	{ value: PiorityEnum.Low, label: 'Low' },
	{ value: PiorityEnum.Normal, label: 'Normal' },
	{ value: PiorityEnum.High, label: 'High' }
];

export const DEFAULT_PRIORITY = PiorityEnum.Normal;

export const DATE_FORMAT = 'yyyy-MM-dd';

export const TODAY = () => new Date();