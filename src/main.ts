import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/exception.filter';
import { mainLogger } from './middlewares/main-logger.middleware';

async function bootstrap() {

  const PORT = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter()) /* (пример глобального подключения кастомного обработчика ошибок - в д.с создаем новый экземпляр класса) */

  // app.use(mainLogger); /* (подключаем кастомный миддлвер) */

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
