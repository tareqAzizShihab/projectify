import { useContext } from "react";
import { SearchContext, TasksReducerContext } from "../../context";
export default function Searchbar() {
  const { tasks } = useContext(TasksReducerContext);
  const { setSearchItem } = useContext(SearchContext);
  return (
    <div className="mx-4 flex-1">
      <input
        type="text"
        placeholder="Search here"
        className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
        onChange={(event) => {
          setSearchItem(
            tasks.filter((task) =>
              task.taskName
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            )
          );
        }}
      />
    </div>
  );
}
