export enum Status {
    CREATED = "created",
    PROCESSING = "processing",
    ABORTED = "abort",
    ERROR = "error",
    DONE = "done" 
}

/* (интерфейс - типизация для задач) */
export interface ITask {
    id: number;
    task: string;
    status: Status;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
} 