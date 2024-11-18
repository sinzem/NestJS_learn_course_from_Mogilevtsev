import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export function mainLogger(req: Request, res: Response, next: NextFunction) {

    Logger.debug("Main logger", "main");

    next();
} /* (пример глобального миддлвера - подключаем в main.ts) */