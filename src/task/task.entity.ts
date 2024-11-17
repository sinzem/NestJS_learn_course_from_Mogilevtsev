import { ITask, Status } from "./task.interface";

/* (на основе типизации создаем entity - класс, применяется для операций с БД, например) */
export class Task implements ITask {
    id = new Date().getTime();
    task: string;
    status: Status  = Status.CREATED;
    tags: string[] = [];
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(task: string,
                tags?: string[],
                status?: Status
    ) {
        this.task = task;
        this.tags = tags;
        this.status = status;
    }
}