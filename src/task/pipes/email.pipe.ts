import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

/* (npx nest g pi task/pipes/email --no-spec --flat  генерируем документ для кастомного пайпа для валидации email адреса) */
@Injectable()
/* (класс на входе получает значение, должен обработать и вернуть его или выдать ошибку) */
export class EmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isEmail(value)) {
      throw new BadRequestException("Incorrect email address")
    }
    return value;
  }
} /* (пример подключения в task.controller.ts) */
