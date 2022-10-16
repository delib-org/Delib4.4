import { getMessaging, onMessage } from "firebase/messaging";

const messaging = getMessaging();
export function listentToMessages() {
    console.log('listening')
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
}
