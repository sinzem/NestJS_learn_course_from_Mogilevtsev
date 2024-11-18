import { ArrayNotEmpty, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "../task.interface";

export class CreateTaskDto {
    /* (валидации подключаем - глобально или в контроллере) */
    @IsString({message: "Название обязательно"}) /* (message выдаст в случае ошибки) */
    @IsNotEmpty({message: "Поле не может быть пустым"})
    task: string;

    @IsOptional() /* (декоратор обозначает, что поле не обязательное) */
    @IsString({each: true, message: "Теги должны быть строчными"}) /* (так как поле представлено массивом, передаем опцию, что каждый элемент должен соответствовать декоратору(строка)) */
    // @Array /* (есть куча проверок массива - начинаются на Array, выпадут в подсказках) */
    @ArrayNotEmpty()
    tags?: string[];

    @IsOptional()
    @IsEnum(Status, {message: "Неверный тип статуса"}) /* (деоратор указывает, что значенпие должно соответствовать одному из перечисления(как аргумент передаем перечисление)) */
    status?: Status;

    @IsOptional()
    @IsEmail({}, {message: "Некорректный email"})
    email: string;
}