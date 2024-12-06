/* eslint-disable react/prop-types */
import { useState } from "react";
import Task from "./task.jsx";

export default function Project({ taskList, bgColor, title }) {
  const [tasks, setTasks] = useState(taskList);
  const [sortType, setSortType] = useState(null);

  if (tasks.length !== taskList.length) {
    setTasks(handleSort(sortType));
  } else {
    let taskObject = {};
    tasks.slice().forEach((task) => {
      taskObject[task.id] = task;
    });

    taskList.slice().forEach((task) => {
      const itemToMatch = taskObject[task.id];
      if (itemToMatch) {
        for (const key in task) {
          const currentValue =
            key === "dueDate" ? new Date(task.dueDate).getTime() : task[key];
          if (currentValue !== itemToMatch[key]) {
            setTasks(handleSort(sortType));
          }
        }
      }
    });
  }

  function handleSort(type) {
    const tasksCopy = taskList.map((task) => ({
      ...task,
      dueDate: new Date(task.dueDate).getTime(),
    }));

    let sortedTasks;

    if (type === "ascend") {
      sortedTasks = tasksCopy.sort((a, b) => a.dueDate - b.dueDate);
    } else {
      sortedTasks = tasksCopy.sort((a, b) => b.dueDate - a.dueDate);
    }
    return sortedTasks;
  }

  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      <div className={`rounded-lg ${bgColor} p-4`}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {title} ({tasks.length})
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending cursor-pointer"
            onClick={() => {
              setSortType(sortType === "ascend" ? "descend" : "ascend");
              setTasks(
                handleSort(sortType === "ascend" ? "descend" : "ascend")
              );
            }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l9 0" />
            <path d="M4 12l7 0" />
            <path d="M4 18l7 0" />
            <path d="M15 15l3 3l3 -3" />
            <path d="M18 6l0 12" />
          </svg>
        </div>
        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center my-3 text-xl font-medium">
              Task List is empty!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
