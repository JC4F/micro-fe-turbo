import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import {
  LucideAngularModule,
  PlusCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-angular';
import { TodoManager } from '@repo/util';
import { HlmButtonDirective, HlmInputDirective } from '@repo/angular-ui';

console.log(TodoManager);

@Component({
  selector: 'todo-app',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    HlmInputDirective,
    HlmButtonDirective,
  ],
  templateUrl: './todo-app.component.html',
})
export class TodoAppComponent {
  readonly PlusCircle = PlusCircle;
  readonly Trash2 = Trash2;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  queryClient = injectQueryClient();
  newTask = new FormControl('');
  currentPage = 1;
  itemsPerPage = 5;

  query = injectQuery(() => ({
    queryKey: ['tasks'],
    queryFn: () => TodoManager.getInstance().getTasks(),
  }));

  addTaskMutation = injectMutation((client) => ({
    mutationFn: (newTask: string) => TodoManager.getInstance().addTask(newTask),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['tasks'] });
    },
  }));

  deleteTaskMutation = injectMutation((client) => ({
    mutationFn: (taskId: number) =>
      TodoManager.getInstance().deleteTask(taskId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['tasks'] });
    },
  }));

  tasks = this.query.data() || [];

  // Calculate pagination values
  totalPages = Math.ceil(this.tasks.length / this.itemsPerPage);
  startIndex = (this.currentPage - 1) * this.itemsPerPage;
  endIndex = this.startIndex + this.itemsPerPage;
  currentTasks = this.tasks.slice(this.startIndex, this.endIndex);

  goToNextPage = () => {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
  };
  goToPrevPage = () => {
    this.currentPage = Math.max(this.currentPage - 1, 1);
  };

  handleAddTask = () => {
    if (this.newTask.value?.trim()) {
      this.addTaskMutation.mutate(this.newTask.value);
      this.newTask.setValue('');
    }
  };

  handleDeleteTask = (taskId: number) => {
    this.deleteTaskMutation.mutate(taskId);
  };
}
