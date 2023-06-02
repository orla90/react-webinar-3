import StoreModule from '../module';

/**
 * Авторизация
 */
class UserState extends StoreModule {
  initState() {
    return {
      userProfile: {},
      errorMessage: '',
      isAuth: false,
      waiting: false,
    };
  }

  async loginUser(userParams) {
    this.setState({ ...this.getState(), waiting: true });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userParams, remember: true }),
      });
      const json = await response.json();
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: true,
        errorMessage: '',
        userProfile: {
          id: json.result.user._id,
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email,
        },
      });
      window.localStorage.setItem('token', json.result.token);
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: false,
        errorMessage: error.message,
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
          errorMessage: '',
          userProfile: {
            id: json.result._id,
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email,
          },
        });
      } catch (error) {
        this.setState({
          ...this.getState(),
          waiting: false,
          isAuth: false,
          errorMessage: error.message,
        });
      }
    }
  }

  setIsAuth(isAuth) {
    if (!isAuth) window.localStorage.removeItem('token');
    this.setState({
      ...this.getState(),
      isAuth: isAuth,
      errorMessage: '',
    });
  }
}

export default UserState;
