/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
    padding: 0.5rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    width: fit-content;
    min-width: 300px;
    cursor: pointer;
    background-color: ${({ isChecked }) =>
        isChecked ? 'rgba(27, 27, 27, 0.1)' : 'transparent'};
`;

const SubText = styled.p`
    color: rgb(108, 108, 108);
`;

const Title = styled.p`
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: ${(props) => (props.isChecked ? 'line-through' : 'none')};
    color: inherit;
`;

const DeleteButton = styled.button`
    color: rgb(218, 69, 69);
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: rgb(132, 10, 10);
    }
`;

const TaskCompact = ({ title, date, defaultCheckedState, handleCheck, handleDelete }) => {

    const deleteClick = (e) => {
      e.stopPropagation();
      handleDelete(title, date);
    }

    return (
        <Wrapper
            onClick={() => handleCheck(title, date)}
            isChecked={defaultCheckedState}>
            <Title isChecked={defaultCheckedState}>{title.toLowerCase()}</Title>
            {/* <SubText>{date}</SubText> */}
            <DeleteButton onClick={deleteClick}>
                <span
                    className="material-symbols-outlined">
                    delete
                </span>
            </DeleteButton>
        </Wrapper>
    );
};

export default TaskCompact;
