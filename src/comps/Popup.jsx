import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { saveTasks } from '../utils/saveTasks';
import Button from './Button';

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
    padding: 1rem;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.16));
`;

const Title = styled.p`
    font-weight: 500;
    user-select: none;
`;

const Form = styled.div`
    display: grid;
    grid-template-columns: 1fr 4rem;
    gap: 0.5rem;

    & > input {
        padding: 0.25rem 0.75rem;
        border-radius: 0.25rem;
        border: 2px solid rgba(0, 0, 0, 0.14);
    }

    & > button {
        background-color: rgb(46, 51, 216);
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 0.25rem;
        font-weight: bold;
    }
`;

const Popup = ({ setOpen, tasks }) => {
    const taskInputRef = useRef();
    const [error, setError] = useState('');

    const close = () => {
        setOpen(false);
    };

    const addTask = () => {
        const value = taskInputRef.current.value.trim();
        if (!value) {
            setError('Task cannot be empty');
            return;
        }

        tasks.push({ title: value, date: new Date(), isActive: true });
        saveTasks(tasks);
        close();
    };

    const handleKeyUp = ({ key }) => {
        if (key !== 'Enter') return;

        addTask();
    };

    return (
        <Wrapper onClick={close}>
            <Container onClick={(e) => e.stopPropagation()}>
                <Title>Add Task</Title>
                <Form>
                    <input
                        type="text"
                        ref={taskInputRef}
                        onKeyUp={handleKeyUp}
                    />
                    <button onClick={addTask}>Add</button>
                </Form>
                <span style={{color: 'red'}}>{error}</span>
            </Container>
        </Wrapper>
    );
};

export default Popup;
