import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class LoginPage extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
  }

  render() {
    const session = this.props.session;
    return (
      <div>
        <span className="page-header">
          <h1>Eventium</h1>
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="username-input">Username</label>
            <input type="text" id="username-input" />
          </div>

          <div>
            <label htmlFor="password-input">Password</label>
            <input type="text" id="password-input" />
          </div>

          <div>
            <Link to="/api/login" role="button">Log in</Link>
          </div>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {

};

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(LoginPage);
