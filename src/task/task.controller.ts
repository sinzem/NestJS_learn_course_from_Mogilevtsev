import { Body, Controller, Get, Header, HttpCode, Param, Post, Redirect, UsePipes, ValidationPipe } from "@nestjs/common";
import { ITask } from "./task.interface";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";

/* (контроллеры отвечают за определение маршрутов, помечаем соответствующим декоратором) */
/* (регистрируем в модуле (в app.module.ts в д.с)) */
@Controller("task") /* (можно передать общее название участка пути, например "/api", или обьект с более подробными настройками) */
export class TaskController { /* (в названии документа и названии класса принято указывать, что это контроллер) */

    constructor(private taskService: TaskService) {} /* (подключаем сервисы) */

    @Get("first") /* (методы контроллера, также можно добавить продолжение пути, например "/posts", вобщем получится "/api/posts") */
    test() { /* (в метод подключаем функцию) */
        return {result: "Everything works", status: 200} /* (в д.с просто вернет на пользователя json-обьект с текстом и статусом) */
    }

    @Get("second") /* (пример продолжения адреса - localhost:3000/test/1) */
    @HttpCode(206)  /* (пример передачи статуса(на пользователя выдаст сообщение внизу, но во вкладке network в консоли код будет 206)) */
    @Header("Tasks", "newTask") /* (можем добавить заголовки) */
    test1() { 
        return {result: "Everything works", status: 200} 
    }

    @Get("third") 
    @Redirect("https://facebook.com")  /* (перенаправление) */
    test2() { 
        return {result: "Everything works", status: 200} 
    }

    @Get()
    getTasks(): ITask[] {
        return this.taskService.getTasks(); /* (подключаем функции из сервисов) */
    }

    @Get(":id") /* (пример получения обьекта по id) */
    getTaskById(@Param("id", {transform: (id) => Number(id)}) id: number): ITask { /* (в Param в опциях можем сразу преобразовать пришедшие данные) */
        return this.taskService.getTaskById(id);
    }

    // @Post() /* (пример Post-запроса  - через postman передали обьект {"task": "text" }  - и он был добавлен в массив тестов(в начале контроллера)) */
    // createTask(@Body("task") task: string) :ITask { /* (задачу получаем в виде строки, сервис после обработки вернет ее в виде ITask(в д.с просто добавит id)) */
    //     return this.taskService.createTask(task);
    // }

    @UsePipes(new ValidationPipe()) /* (подключаем валидатор дто) */
    @Post()
    createTask(@Body() task: CreateTaskDto): ITask {
        return this.taskService.createTask(task);
    }
 }