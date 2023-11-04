import { useEffect, useState } from 'react';
import './App.css';
import TaskCompact from './comps/TaskCompact';
import TodoList from './comps/TodoList';
import Divider from './comps/Divider';
import Button from './comps/Button';
import Popup from './comps/Popup';
import { saveTasks } from './utils/saveTasks';

function App() {
    const [open, setOpen] = useState(false);
    const [activeList, setActiveList] = useState([]);
    const [closedList, setClosedList] = useState([]);

    const getData = () => {
        console.log('Getting Data');
        let data = window.localStorage.getItem('Todo_data');
        if (!data) {
            setActiveList([]);
            setClosedList([]);
            return;
        }
        data = JSON.parse(data);
        const active = data.filter(({ isActive }) => isActive);
        const closed = data.filter(({ isActive }) => !isActive);
        setActiveList(active);
        setClosedList(closed);
    };

    const handleCheck = (title, date) => {
        const tasks = activeList.concat(closedList);
        const target = tasks.find(
            (task) => task.title === title && task.date === date
        );
        console.log(target);
        target.isActive = !target.isActive;

        saveTasks(tasks);
        getData();
    };

    const handleDelete = (title, date) => {
        const tasks = activeList.concat(closedList);
        const filteredTasks = tasks.filter(
            (task) => task.title !== title && task.date !== date
        );
        
        saveTasks(filteredTasks);
        getData();
    }

    const deleteAll = () => {
        saveTasks([]);
        getData();
    }

    useEffect(() => getData, [open]);

    return (
        <>
            <main>
                <nav>
                    <h1>To Do List</h1>
                    <div>
                        <Button onClick={() => setOpen(true)}>
                            <span className="material-symbols-outlined">
                                add
                            </span>{' '}
                            New Task
                        </Button>
                        {closedList.length > 0 || activeList.length > 0 ? (
                            <Button
                                onClick={deleteAll}
                                delete>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>{' '}
                                All
                            </Button>
                        ) : undefined}
                    </div>
                </nav>
                <Divider />
                {activeList.length > 0 ? (
                    <TodoList>
                        {activeList.map((task, i) => (
                            <TaskCompact
                                title={task.title}
                                date={task.date}
                                defaultCheckedState={!task.isActive}
                                handleCheck={handleCheck}
                                handleDelete={handleDelete}
                                key={i}></TaskCompact>
                        ))}
                    </TodoList>
                ) : (
                    <p>You have no active tasks :)</p>
                )}

                {closedList.length > 0 && (
                    <>
                        <Divider />
                        <TodoList>
                            {closedList.map((task, i) => (
                                <TaskCompact
                                    title={task.title}
                                    date={task.date}
                                    defaultCheckedState={!task.isActive}
                                    handleCheck={handleCheck}
                                    handleDelete={handleDelete}
                                    key={i}></TaskCompact>
                            ))}
                        </TodoList>
                    </>
                )}
            </main>
            {open && (
                <Popup
                    setOpen={setOpen}
                    tasks={activeList.concat(closedList)}></Popup>
            )}
        </>
    );
}

export default App;
