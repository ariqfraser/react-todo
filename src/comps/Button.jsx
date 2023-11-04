import { styled } from "styled-components"

const Button = styled.button`
    background-color: ${props => props.delete ? 'transparent' : 'rgb(46, 51, 216)'};
    color: ${props => props.delete ? 'rgb(218, 69, 69)' : 'white'};
    border: ${props => props.delete ? '2px solid rgb(218, 69, 69)' : 'none'};
    border-radius: 0.5rem;
    padding: ${props => !props.delete ? ' 0.25rem 0.75rem 0.25rem 0.5rem' : '0.25rem 0.5rem'};
    font-size: 1rem;
    cursor: pointer;
    /* font-weight: ${props => props.delete ? 'bold' : '500'}; */
    font-weight: 600;
    display: flex;
    align-items: center;
`

export default Button