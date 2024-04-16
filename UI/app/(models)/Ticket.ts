import { Category } from './Category';
import { Priority } from './Priority';
import { Status } from './Status';
import { User } from './User';

export interface Ticket {
    id:string;
    title: string;
    description: string | undefined;
    category: Category;
    priority: Priority;
    progress: number;
    status: Status;
    active: boolean;
    createdAt: Date;
    updateAt: Date;
    assignee: User | undefined;
}