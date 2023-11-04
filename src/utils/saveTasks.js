export const saveTasks = (tasks) => {
    window.localStorage.setItem('Todo_data', JSON.stringify(tasks));
}