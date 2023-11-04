import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { saveTasks } from '../utils/saveTasks';

const Wrapper = styled.div`
    position: absolute;
    inset: 0;
    backdrop-filter: blur(2px);
`;

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 0.5rem;
    background-color: #fdfdfd;
    padding: 2rem;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.16));
`;

const Title = styled.p`
    user-select: none;
`;

const Popup = ({ setOpen, tasks }) => {
    const taskInputRef = useRef();
    const [error, setError] = useState('')

    const close = () => {
        setOpen(false)
    }

    const addTask = () => {
        const value = taskInputRef.current.value.trim();
        if (!value) {
            setError('Task cannot be empty');
            return;
        }

        tasks.push({title: value, date: new Date(), isActive: true});
        saveTasks(tasks)
        close();
    }

    const handleKeyUp = ({key}) => {
        if (key !== 'Enter') return;

        addTask();
    }

    return (
        <Wrapper onClick={close}>
            <Container onClick={(e) => e.stopPropagation()}>
                <Title>Add Task</Title>
                <input type="text" ref={taskInputRef} onKeyUp={handleKeyUp}/>
                <button onClick={addTask}>Add</button>
                <br /> {error}
            </Container>
        </Wrapper>
    );
};

export default Popup;
