// react-test-renderer - this lets us to render our component inside regular js code and we can assert something about what got rendered.a1
// For the Header component we just need shallow renderer not full dom rendering
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('Should render Header correctly', () => {
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    const wrapper = shallow(<Header startLogout={() => {}}/>);
    // expect(wrapper.find('h1').length).toBe(1);
    // expect(wrapper.find('h1').text()).toBe('Expensify');

    expect(wrapper).toMatchSnapshot();
});

test('Should call start logout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');

    expect(startLogout).toHaveBeenCalled();
});