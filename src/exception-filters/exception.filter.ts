import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException, Logger } from '@nestjs/common';

/* (фильтр для ошибок (npx nest g f exception - чтобы сгенерировать)) */
@Catch() /* (декоратор для класса по отлову ошибок, по умолчанию отлавливает все, можно передать обьект с настройками) */
export class AllExceptionsFilter<T> implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name); /* (для логирования ошибок можно подключить встроенный логгер, передаем в него имя класса, функционал пишем ниже после получения ошибки) */
  catch(exception: T, host: ArgumentsHost) { /* (принимает ошибку и хост для извлечения контекста) */
    this.logger.error(exception); /* (логируем ошибку - в д.с выводит в консоль, в проектах документируем(используют Winston)) */
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR; /* (получаем статус ошибки, если не определили - 500) */
    if (status !== HttpStatus.INTERNAL_SERVER_ERROR) { 
      response.status(status).json(exception); /* (при использовании кастомных обработчиков ошибки вернет информацию из них) */
      return;
    }

    response.status(status).join({ /* (возвращаем на клиента) */
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
} /* (подключаем или глобально, или в контроллере - на весь, или на отдельные маршруты) */
