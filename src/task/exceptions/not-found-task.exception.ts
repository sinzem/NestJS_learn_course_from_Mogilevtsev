import { HttpException, HttpStatus } from "@nestjs/common";

interface Error {
    message?: never; /* (типизируем ключи из метода с обозначением never, чтобы их не переназначили) */
    error?: never;
    createdAt?: never;
    [k: string]: string;
}

/* (кастомный класс для ошибки) */
export class NotFoundTaskException extends HttpException {
    constructor(error: Error = null) { /* (можем передавать дополнительные данные в класс, по умолчанию ставим null) */
        super( /* (переопределяем сообщения метода) */
            {
                message: "Задача не была найдена",
                error: "not_found_task_exception",
                createdAt: new Date(),
                ...error /* (выводим ошибки, которые передали как аргумент) */
            },
            HttpStatus.NOT_FOUND
        )
    }
} /* (пример использования в task.service.ts) */