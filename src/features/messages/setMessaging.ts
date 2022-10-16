import { messaging } from "../../control/firebase/config";
export async function getToken2(): Promise<string | false> {
    try {
      return await messaging.firebaseDependencies.installations.getToken({
        vapidKey:
          "BOXKnicJW5Cu3xwRG7buXf-JU8tS-AErJX_Ax7CsUwqZQvBvo2E-ECnE-uGvUKcgeL-1nT-cJw8qGo4dH-zrfGA",
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }