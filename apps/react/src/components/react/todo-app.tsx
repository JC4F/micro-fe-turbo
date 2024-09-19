import { useState } from "react";
import { Trash2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Input } from "@repo/react-ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoManager } from "@repo/util";

export const TodoApp = () => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch tasks from TodoManager with TanStack Query
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TodoManager.getInstance().getTasks(),
  });

  // Mutations for adding and deleting tasks
  const addTaskMutation = useMutation({
    mutationFn: (newTask: string) => TodoManager.getInstance().addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: number) =>
      TodoManager.getInstance().deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Calculate pagination values
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((page) => Math.max(page - 1, 1));

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTaskMutation.mutate(newTask);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTaskMutation.mutate(taskId);
  };

  return (
    <div className="rt-max-w-md rt-mx-auto rt-bg-white rt-rounded-xl rt-shadow-md rt-overflow-hidden">
      <div className="rt-p-6">
        <h1 className="rt-text-xl rt-font-bold rt-text-gray-800 rt-mb-4">
          💩💩 App
        </h1>

        <form onSubmit={handleAddTask} className="rt-flex rt-space-x-2 rt-mb-4">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="rt-flex-grow"
          />
          <Button type="submit" size="sm">
            <PlusCircle className="rt-h-4 rt-w-4 rt-mr-1" />
            Add
          </Button>
        </form>

        <ul className="rt-space-y-2 rt-mb-4">
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : (
            <>
              {currentTasks.map((task) => (
                <li
                  key={task.id}
                  className="rt-flex rt-items-center rt-justify-between rt-p-2 rt-bg-gray-50 rt-rounded-lg"
                >
                  <span className="rt-text-gray-700 rt-text-sm">
                    {task.text}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label="Delete task"
                    className="rt-size-8 !rt-p-0"
                  >
                    <Trash2 className="rt-h-3 rt-w-3" />
                  </Button>
                </li>
              ))}
            </>
          )}
        </ul>

        <div className="rt-flex rt-items-center rt-justify-between rt-text-sm">
          <Button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="rt-text-xs"
          >
            <ChevronLeft className="rt-h-3 rt-w-3 rt-mr-1" />
            Prev
          </Button>
          <span className="rt-text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="rt-text-xs"
          >
            Next
            <ChevronRight className="rt-h-3 rt-w-3 rt-ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
