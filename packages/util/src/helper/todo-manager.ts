declare global {
  interface Window {
    todoManagerInstance: TodoManager | undefined;
  }
}

export class TodoManager {
  private static instance: TodoManager;
  private tasks: { id: number; text: string }[] = [];

  private constructor() {
    this.loadTasks();
  }

  // Ensure only one instance of TodoManager
  public static getInstance(): TodoManager {
    if (!TodoManager.instance) {
      if (window["todoManagerInstance"]) {
        TodoManager.instance = window["todoManagerInstance"];
      } else {
        TodoManager.instance = new TodoManager();
        window["todoManagerInstance"] = TodoManager.instance;
      }
    }
    return TodoManager.instance;
  }

  // Load tasks from localStorage with error handling
  private loadTasks() {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      } else {
        // If no tasks in localStorage, use default tasks
        this.tasks = this.getDefaultTasks();
        this.saveTasks();
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      // Fallback to default tasks if there is a parsing error
      this.tasks = this.getDefaultTasks();
      this.saveTasks();
    }
  }

  // Save tasks to localStorage
  private saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Return default tasks
  private getDefaultTasks() {
    return [
      { id: 1, text: "Learn React" },
      { id: 2, text: "Build a todo app" },
      { id: 3, text: "Add pagination" },
      { id: 4, text: "Style with Tailwind" },
      { id: 5, text: "Deploy to production" },
      { id: 6, text: "Write documentation" },
      { id: 7, text: "Share with friends" },
    ];
  }

  getTasks(): Promise<{ id: number; text: string }[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.tasks);
      }, 1000);
    });
  }

  addTask(newTask: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (newTask.trim()) {
          this.tasks.push({ id: Date.now(), text: newTask });
          this.saveTasks(); // Save the updated task list to localStorage
        }
        resolve();
      }, 100);
    });
  }

  // Delete a task with a 500ms delay
  deleteTask(id: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks(); // Save the updated task list to localStorage
        resolve();
      }, 100);
    });
  }
}
