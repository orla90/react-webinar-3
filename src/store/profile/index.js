import StoreModule from '../module';

/**
 * Авторизация
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      userProfile: {},
      waiting: false,
    };
  }

  async getProfileData() {
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
          userProfile: {
            id: json.result._id,
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email,
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
}

export default ProfileState;
