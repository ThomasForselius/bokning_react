import React from 'react'
import { Dropdown } from 'react-bootstrap';
import styles from '../styles/EditBooking.module.css'

    const ThreeDots = React.forwardRef(({ onClick }, ref) => (
        <i
            className='fa-regular fa-pen-to-square'
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        />
        
        ));

export const DropDown = ({handleEdit, handleDelete}) => {
    return (   
        <Dropdown className='ml-auto' drop="down">
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu popperConfig={{ strategy: "fixed" }} className={styles.dropdown}>
            <Dropdown.Item onClick={handleEdit} aria-label="Edit"><i className='fas fa-edit' /></Dropdown.Item>
            <Dropdown.Item onClick={handleDelete} aria-label="Delete"><i className='fas fa-trash' /></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}