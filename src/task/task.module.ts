import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";


@Module({
    controllers: [TaskController],
    providers: [TaskService]
}) /* (класс для обьединения сонтроллеров и сервисов - подключаем в главный app.module.ts) */
export class TaskModule {}