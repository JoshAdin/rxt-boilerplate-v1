import authReducer from '../../reducers/auth';

test('Should set uid for login', () => {
    const action = { type: 'LOGIN', uid: 'id-xyz' };
    const state = authReducer(undefined, action);
    expect(state.uid).toBe('id-xyz');
});

test('Should remove uid for logout', () => {
    const action = { type: 'LOGOUT' };
    const state = authReducer(undefined, action);
    expect(state).toEqual({});
});
