import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ChangeTodoDto } from './dto/change-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll({
      order: [['id', 'ASC']],
    });
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({ where: { id } });
  }

  async create(createDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();

    todo.title = createDto.title;
    todo.completed = createDto.completed;

    return todo.save();
  }

  async update(
    id: string,
    changeTodo: ChangeTodoDto,
  ): Promise<[affectedCount: number, affectedRows: Todo[]]> {
    return this.todoModel.update(
      { ...changeTodo },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }

  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await todo.destroy();
  }
}
