import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/dashboard' activeClassName='is-active'>
            Dashboard
        </NavLink>
        <NavLink to='/create' activeClassName='is-active'>
            Create Expense
        </NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
});

// Connecting to Redux by using conncect()
export default connect(undefined, mapDispatchToProps)(Header);



// STEPS FOR WIRING UP THE LOGOUT BUTTON TO REDUX STORE:
// Create a button tag in a component
// Import the action (startLogout)
// Setup connect() to connect to Redux store
// With connect() set up, we now have access to dispatch
// Setup mapDispatchToProps to dispatch the action
// Grab the prop (startLogout) and attach it to onClick event in button tag
// To do this, destructure the prop name, startLogout and pass it in to Header component. Then pass this prop name to onClick event
