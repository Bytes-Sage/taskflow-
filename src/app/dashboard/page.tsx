"use client";
// import Link from 'next/link';
// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

export default function Dashboard() {
  //   const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Mock data
      setTasks([
        {
          id: "1",
          title: "Complete project proposal",
          completed: false,
          priority: "high",
          dueDate: "2025-05-15",
        },
        {
          id: "2",
          title: "Schedule team meeting",
          completed: true,
          priority: "medium",
          dueDate: "2025-05-10",
        },
        {
          id: "3",
          title: "Review quarterly goals",
          completed: false,
          priority: "high",
          dueDate: "2025-05-20",
        },
        {
          id: "4",
          title: "Update documentation",
          completed: false,
          priority: "low",
        },
        {
          id: "5",
          title: "Email client about project status",
          completed: true,
          priority: "medium",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskPriority("medium");
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const getPriorityClasses = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewTask(e);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Task form */}
        <div className="bg-white shadow rounded-lg mb-6 p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add New Task
          </h2>
          <div
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              aria-label="Task title"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              aria-label="Task Priority"
              title="Task Priority"
              value={newTaskPriority}
              onChange={(e) =>
                setNewTaskPriority(e.target.value as "low" | "medium" | "high")
              }
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={addNewTask}
              aria-label="Add new task"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white shadow rounded-lg mb-6 p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-md ${
                  filter === "all"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1 rounded-md ${
                  filter === "active"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded-md ${
                  filter === "completed"
                    ? "bg-indigo-100 text-indigo-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Completed
              </button>
            </div>
            <div className="text-gray-500 text-sm">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}{" "}
              {filter !== "all" ? `(${filter})` : ""}
            </div>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2">Loading tasks...</span>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No {filter !== "all" ? filter : ""} tasks found.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <li key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskStatus(task.id)}
                        aria-label={`Mark task as ${
                          task.completed ? "incomplete" : "complete"
                        }: ${task.title}`}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            task.completed
                              ? "line-through text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityClasses(
                              task.priority
                            )}`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                          {task.dueDate && (
                            <span>Due: {formatDate(task.dueDate)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete task: ${task.title}`}
                      title={`Delete task: ${task.title}`}
                      className="ml-2 p-1 text-gray-400 hover:text-red-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
