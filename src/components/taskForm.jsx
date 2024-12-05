import { useContext, useState } from "react";
import { FormModelContext, TasksReducerContext } from "../context.js";

export default function TaskForm() {
  const { dispatch } = useContext(TasksReducerContext);
  const { isEdit, setIsEdit } = useContext(FormModelContext);
  const isAdd = isEdit === "add";
  const dateObject = new Date(isEdit.dueDate);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const [formValue, setFormValue] = useState(
    !isAdd && isEdit
      ? {
          ...isEdit,
          dueDate: `${year}-${month < 10 ? `0${month}` : month}-${
            day < 10 ? `0${day}` : day
          }`,
        }
      : {
          id: crypto.randomUUID(),
          taskName: "",
          description: "",
          dueDate: "",
          category: "",
        }
  );

  function handleinputValue(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }
  return (
    <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl">
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-green-400">Create Task</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              required
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValue.taskName}
              onChange={(event) => handleinputValue(event)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValue.description}
              onChange={(event) => handleinputValue(event)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValue.dueDate}
              onChange={(event) => handleinputValue(event)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValue.category}
              onChange={(event) => handleinputValue(event)}
            >
              <option value="">Select One</option>
              <option value="todo">To-Do</option>
              <option value="onProgress">On Progress</option>
              <option value="done">Done</option>
              <option value="revised">Revised</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => setIsEdit(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={(e) => {
                e.preventDefault();
                dispatch({
                  type: !isAdd ? "edited" : "added",
                  task: formValue,
                });
                setIsEdit(null);
              }}
            >
              {!isAdd ? "Save" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
