import { observable, action } from 'mobx';

class NotificationStore {
  @observable error: string | null = null;

  @action setError = (message: string) => {
    this.error = message;
  }

  @action dropError = () => {
    this.error = null;
  }
}

export { NotificationStore }