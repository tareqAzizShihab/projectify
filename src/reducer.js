function taskReducer(state, action) {
  switch (action.type) {
    case "added": {
      return [...state, action.task];
    }

    case "edited": {
      return state.map((item) => {
        if (item.id === action.task.id) {
          return action.task;
        } else {
          return item;
        }
      });
    }

    case "deleted": {
      return state.filter((item) => {
        return item.id === action.taskId ? false : true;
      });
    }

    default:
      throw new Error("Unknown Error");
  }
}

export { taskReducer };
