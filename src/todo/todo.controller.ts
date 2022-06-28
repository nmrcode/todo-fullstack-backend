import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ChangeTodoDto } from './dto/change-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  create(@Body() createDto: CreateTodoDto) {
    return this.todoService.create(createDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

  @Patch(':id')
  update(@Body() changeTodo: ChangeTodoDto, @Param('id') id: string) {
    return this.todoService.update(id, changeTodo);
  }
}
