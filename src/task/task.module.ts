import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { LoggerMiddleware } from "./middlewares/logger/logger.middleware";


@Module({
    controllers: [TaskController],
    providers: [TaskService]
}) /* (класс для обьединения сонтроллеров и сервисов - подключаем в главный app.module.ts) */
export class TaskModule implements NestModule { /* (подключаем миддлвер с помощью NestModule) */
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(TaskController); /* (навешиваем миддлвер полностью на контроллер, можно передать обьект с отдельными маршрутами) */
    }
}