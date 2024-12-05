import { useContext } from "react";
import {
  FormModelContext,
  SearchContext,
  TasksReducerContext,
} from "../../context.js";
import Project from "./project.jsx";

export default function Projects() {
  const { searchItem } = useContext(SearchContext);
  let { tasks } = useContext(TasksReducerContext);
  const taskList = searchItem ? searchItem : tasks;

  const todoTask = taskList.filter((task) => task.category === "todo");
  const onProgressTask = taskList.filter(
    (task) => task.category === "onProgress"
  );
  const doneTask = taskList.filter((task) => task.category === "done");
  const revisedTask = taskList.filter((task) => task.category === "revised");
  const { isEdit } = useContext(FormModelContext);

  return (
    <div className="-mx-2 mb-6 flex flex-wrap">
      {/* To-Do */}
      <Project taskList={todoTask} bgColor={"bg-indigo-600"} title={"To-Do"} />

      {/* <!-- On Progress --> */}
      <Project
        taskList={onProgressTask}
        idForSync={isEdit}
        bgColor={"bg-yellow-500"}
        title={"On Progress"}
      />

      {/* <!-- Done --> */}
      <Project
        taskList={doneTask}
        idForSync={isEdit}
        bgColor={"bg-teal-500"}
        title={"Done"}
      />

      {/* <!-- Revised --> */}
      <Project
        taskList={revisedTask}
        idForSync={isEdit}
        bgColor={"bg-rose-500"}
        title={"Revised"}
      />
    </div>
  );
}
