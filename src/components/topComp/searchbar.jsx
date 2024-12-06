import { useContext } from "react";
import { SearchContext, TasksReducerContext } from "../../context";
let prevTasks;
let searchValue;
export default function Searchbar() {
  const { setSearchItem } = useContext(SearchContext);
  const { tasks } = useContext(TasksReducerContext);

  function handleSearch(searchText) {
    setSearchItem(
      tasks.filter((task) => task.taskName.toLowerCase().includes(searchText))
    );
    prevTasks = tasks;
  }

  let prevTasksObject = {};

  prevTasks &&
    prevTasks.slice().forEach((task) => {
      prevTasksObject[task.id] = task;
    });

  prevTasksObject &&
    tasks.slice().forEach((task) => {
      const itemToMatch = prevTasksObject[task.id];
      if (itemToMatch) {
        for (const key in task) {
          const currentValue =
            key === "dueDate" ? new Date(task.dueDate).getTime() : task[key];
          const matchValue =
            key === "dueDate"
              ? new Date(task.dueDate).getTime()
              : itemToMatch[key];
          if (currentValue !== matchValue) {
            handleSearch(searchValue);
          }
        }
      }
    });

  if (prevTasks) {
    prevTasks.length !== tasks.length && handleSearch(searchValue);
  }

  return (
    <div className="mx-4 flex-1">
      <input
        type="text"
        placeholder="Search here"
        className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
        onChange={(event) => {
          const presentValue = event.target.value.toLowerCase();
          searchValue = presentValue;
          handleSearch(presentValue);
        }}
      />
    </div>
  );
}
