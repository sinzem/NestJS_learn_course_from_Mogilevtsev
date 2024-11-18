import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ITask } from "./task.interface";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { NotFoundTaskException } from "./exceptions/not-found-task.exception";

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
        if (!task) {
            // throw new HttpException("Задача не найдена", 200/* HttpStatus.NOT_FOUND */); /* (пример вывода ошибки с помощью встроенного класса, передаем сообщение и статус - тоже встроенный, можно любой прописать самому, например 404 */
            // ------
            // throw new NotFoundException(); /* (заготовка для ошибки - выдаст Not found, 404, можно передать свои сообщение и статус, как выше) */
            // ------
            throw new NotFoundTaskException(); /* (выводим кастомную ошибку, можем передать аргументом обьект с доп. данными, кроме тех, что типизированы never в классе ошибки) */
        }
        return task;
    } 

    // createTask(task: string): ITask {
    //     const newTask = new Task(task);
    //     this.tasks.push(newTask);
    //     return newTask;
    // }

    createTask({task, tags, status, email}: CreateTaskDto): ITask {
        const newTask = new Task(task, tags, status, email);
        this.tasks.push(newTask);
        return newTask;
    }

    getTasksByEmail(email: string): ITask[] {
        const tasks = this.tasks.filter(t => t.email === email);
        if (!tasks || tasks.length === 0) {
            throw new BadRequestException("Задачи не были найдены")
        }
        return tasks;
    }
}