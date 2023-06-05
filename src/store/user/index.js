import StoreModule from '../module';

/**
 * Авторизация
 */
class UserState extends StoreModule {
  initState() {
    return {
      errorMessage: '',
      isAuth: false,
      waiting: false,
      user: {},
    };
  }

  async loginUser(userParams) {
    this.setState({ ...this.getState(), errorMessage: '', waiting: true });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userParams, remember: true }),
      });
      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.getState(),
          waiting: false,
          isAuth: true,
          errorMessage: '',
          user: {
            id: json.result.user._id,
            name: json.result.user.profile.name,
          },
        });
        window.localStorage.setItem('token', json.result.token);
      } else if (json.error) {
        this.setState({
          ...this.getState(),
          waiting: false,
          isAuth: false,
          errorMessage: json.error.data.issues[0].message || json.error.message,
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: false,
        errorMessage: error.message,
      });
    }
  }

  async logoutUser() {
    this.setState({ ...this.getState(), waiting: true });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': window.localStorage.getItem('token'),
        },
      });
      await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      window.localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: false,
        errorMessage: '',
        user: {},
      });
    }
  }

  async checkIsAuth() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({
        ...this.getState(),
        waiting: true,
      });
      try {
        const response = await fetch(`/api/v1/users/self`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': token,
          },
        });
        const json = await response.json();
        this.setState({
          ...this.getState(),
          waiting: false,
          isAuth: true,
          user: {
            id: json.result._id,
            name: json.result.profile.name,
          },
        });
      } catch (e) {
        console.log(e);
        this.setState({
          ...this.getState(),
          waiting: false,
        });
      }
    }
  }

  resetErrorMessage() {
    this.setState({
      ...this.getState(),
      errorMessage: '',
    });
  }
}

export default UserState;
