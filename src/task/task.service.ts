import { Injectable } from "@nestjs/common";
import { ITask } from "./task.interface";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

/* (сервисы - набор функций для работы контроллеров, инжектируются в контроллер или контроллеры других модулей, регистрируем в родном модуле) */
@Injectable() /* (декоратор для сервисов) */
export class TaskService {

    private tasks: ITask[] = [
        // {id: 1, task: "task_1"},
        // {id: 2, task: "task_2"}
    ];  /* (массив для примера работы с сервисами) */ 

    getTasks(): ITask[] {
        return this.tasks;
    }

    getTaskById(id: number): ITask {
        const task = this.tasks.find(t => t.id === id);
        return task;
    } 

    // createTask(task: string): ITask {
    //     const newTask = new Task(task);
    //     this.tasks.push(newTask);
    //     return newTask;
    // }

    createTask({task, tags, status}: CreateTaskDto): ITask {
        const newTask = new Task(task, tags, status);
        this.tasks.push(newTask);
        return newTask;
    }

}