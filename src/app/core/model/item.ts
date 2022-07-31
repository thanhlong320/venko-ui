import { Task } from "./task"

export interface Item {
    id: string;
    code: string;
    name: string;
    tasks: Task[];
}