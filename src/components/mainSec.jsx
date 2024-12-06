import { useReducer, useState } from "react";
import {
  FormModelContext,
  SearchContext,
  TasksReducerContext,
} from "../context.js";
import { taskReducer } from "../reducer.js";
import Header from "./header.jsx";
import Projects from "./projectComp/projects.jsx";
import TaskForm from "./taskForm.jsx";
import Topbar from "./topComp/topbar.jsx";

// const initialTasks = [
//   {
//     id: crypto.randomUUID(),
//     taskName: "Task one",
//     description: "Hello! i am Task One.",
//     dueDate: "12/12/2024",
//     category: "todo",
//   },
//   {
//     id: crypto.randomUUID(),
//     taskName: "Task onemptied",
//     description: "Hello! i am Task Two.",
//     dueDate: "10/12/2024",
//     category: "todo",
//   },
//   {
//     id: crypto.randomUUID(),
//     taskName: "Task Three",
//     description: "Hello! i am Task Three.",
//     dueDate: "12/12/2024",
//     category: "onProgress",
//   },
//   {
//     id: crypto.randomUUID(),
//     taskName: "Task Four",
//     description: "Hello! i am Task Four.",
//     dueDate: "12/12/2024",
//     category: "done",
//   },
//   {
//     id: crypto.randomUUID(),
//     taskName: "Task Two",
//     description: "Hello! i am Task Two.",
//     dueDate: "12/12/2024",
//     category: "revised",
//   },
// ];

export default function MainSec() {
  const [isEdit, setIsEdit] = useState(null);
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [searchItem, setSearchItem] = useState(null);

  return (
    <FormModelContext.Provider value={{ isEdit, setIsEdit }}>
      <TasksReducerContext.Provider value={{ tasks, dispatch }}>
        <SearchContext.Provider value={{ searchItem, setSearchItem }}>
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Topbar />

            <div className="mx-auto max-w-7xl p-6">
              <Header />

              <Projects />
            </div>

            {isEdit && (
              <div className="backdrop-blur-sm bg-white/20 h-[100vh] w-[100vw] flex justify-center items-center absolute top-0 right-0">
                <TaskForm />
              </div>
            )}
          </main>
        </SearchContext.Provider>
      </TasksReducerContext.Provider>
    </FormModelContext.Provider>
  );
}
