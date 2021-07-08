import React from 'react';
import renderer from 'react-test-renderer';
import App from '../components/App';
import Chat from '../components/Chat';
import Dashboard from '../components/Dashboard';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import Profile from '../components/Profile';
import { shallow, mount } from 'enzyme';


const expected = true;
const actual = false;

test('it works', () => {
    expect(actual).toBe(expected);
})

test('Screen should initialize state as HomePage', () => {
    let wrapper  = shallow(
        <App/>
    )
    expect(wrapper.firebaseInitialized).toBe(false);
})