import MediasiteApi from './api/MediasiteApi';

export default {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true);
      return;
    }

    if (email === undefined && pass === undefined) {
      return;
    }

    MediasiteApi.login(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) {
          cb(true);
        }
        this.onChange(true);
      } else {
        if (cb) {
          cb(false);
        }
        this.onChange(false);
      }
    })
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) cb()
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  onChange() {}
}
