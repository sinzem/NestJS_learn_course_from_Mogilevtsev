import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/* (npx nest g mi task/middlewares/logger --no-spec  - генерируем миддлвер - функция, перехватывающая запрос и обрабатывающая его) */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: () => void) {

    const {body} = req; /* (можем посмотреть на тело запроса) */
    this.logger.verbose(`Body is ${JSON.stringify(body, null, 2)}`); /* (выдаст тело запроса в терминале в ) */

    /* (пишем функционал по обработке запроса) */

    next(); /* (запускаем следующий миддлвер или передаем запрос по назначению) */
  }
} /* (регистрируем в д.с в task.module.ts) */
