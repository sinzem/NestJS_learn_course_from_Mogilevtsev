import { plainToInstance } from "class-transformer";
import { CreateTaskDto } from "./create-task.dto";
import { validate } from "class-validator";
import { Status } from "../task.interface";

/* (тестирование для дто) */
// xdescribe("create-task.dto", () => { /* (заблокировать запуск теста можно поставив х перед describe или it) */
describe("create-task.dto", () => {
    let dto;
    beforeAll(() => {
        dto = {
            task: "",
            tags: [],
            status: ""
        }
    })

    it("task пустая", async () => { /* (проверка на пустое поле task) */
        const ofImportDto = plainToInstance(CreateTaskDto, dto); /* (иммитируем передачу dto из beforeAll в проект) */
        const errors = await validate(ofImportDto); /* (валидируем ответ - выдаст массив ошибок) */
        expect(errors.map(err => err.property).includes("task")).toBeTruthy();  /* (перебираем массив, ожидаем, что в значениях ошибок попадется поле "task") */
    })
    it("task не пустая", async () => { 
        dto.task = "Task name"
        const ofImportDto = plainToInstance(CreateTaskDto, dto); 
        const errors = await validate(ofImportDto); 
        expect(errors.map(err => err.property).includes("task")).toBeFalsy(); 
    })

    it("tags пустой", async () => { 
        const ofImportDto = plainToInstance(CreateTaskDto, dto); 
        const errors = await validate(ofImportDto); 
        expect(errors.map(err => err.property).includes("tags")).toBeTruthy(); 
        expect(dto.tags.length).toBe(0);
    })
    it("не каждый элемент tags является строкой и массив не пустой", async () => { 
        dto.tags = ["something", 2];
        const ofImportDto = plainToInstance(CreateTaskDto, dto); 
        const errors = await validate(ofImportDto); 
        expect(errors.map(err => err.property).includes("tags")).toBeTruthy(); 
        expect(dto.tags.length).not.toBe(0);
        expect(dto.tags.every(el => typeof el === "string")).not.toBeTruthy();
    })
    it("каждый элемент tags является строкой и массив не пустой", async () => { 
        dto.tags = ["something", "2", "6"];
        const ofImportDto = plainToInstance(CreateTaskDto, dto); 
        const errors = await validate(ofImportDto); 
        expect(errors.map(err => err.property).includes("tags")).toBeFalsy(); 
        expect(dto.tags.length).not.toBe(0);
        expect(dto.tags.every(el => typeof el === "string")).toBeTruthy();
    })

    it("тип статуса не является значением enum Status", async () => { 
        dto.status = "status"
        const ofImportDto = plainToInstance(CreateTaskDto, dto);
        const errors = await validate(ofImportDto); 
        expect(errors.map(err => err.property).includes("status")).toBeTruthy();  
    })
    it("тип статуса является значением enum Status", async () => { 
        dto.status = Status.ERROR;
        const ofImportDto = plainToInstance(CreateTaskDto, dto); 
        const errors = await validate(ofImportDto); 
        expect(errors.map(err => err.property).includes("status")).toBeFalsy(); 
        expect(dto.status).toBe("error");
    })
}) /* (запускаем  npm run test) */