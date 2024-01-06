// import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
  USER = 'user';

  static setUser(data) {
    return AsyncStorage.setItem(AsyncStorageService.USER, JSON.stringify(data));
  }
  static async getUser() {
    try {
      const response = await AsyncStorage.getItem(
        AsyncStorageService.USER,
      );
      return JSON.parse(response);
    } catch (e) {
      console.log(e, 'error');
      return Promise.reject(e);
    }
  }
  static clearUser() {
    return AsyncStorage.removeItem(AsyncStorageService.USER);
  }
}