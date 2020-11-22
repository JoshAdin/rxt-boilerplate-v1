import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

// for testing purpose using 'export' instead of 'export default'
// Why? incase I connect to the redux store I will probably need to test the pure class.
export class LoginPage extends React.Component {
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1  className="box-layout__title">Boilerplate</h1>
                    <p>Tag line for app</p>
                    <button
                        className="button"
                        onClick={this.props.startLogin}
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(null, mapDispatchToProps)(LoginPage);
