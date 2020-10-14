import { ReactNotificationOptions } from 'react-notifications-component';

const notification: ReactNotificationOptions = {
  insert: "bottom",
  container: "bottom-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 3000
  }
}

export default notification;