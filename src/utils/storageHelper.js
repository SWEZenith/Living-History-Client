import { AsyncStorage } from 'react-native';
import * as constants from '@utils/constants';

/**
 *  Storage helper.
 */
class StorageHelper {

  /**
   *  Sets key value pair.
   */
  static async set(key, value) {

    try {

      AsyncStorage.setItem(key, value);

    } catch(err) {

      console.log('Something went wrong with storage.', err);
    }
  }


  /**
   *  Gets value of specified key.
   */
  static async get(key) {

    try {

      return AsyncStorage.getItem(key);

    } catch(err) {

      console.log('Something went wrong with storage.', err);
    }
  } 

  /**
   *  Removes specified key.
   */
  static async remove(key) {

    try {

      AsyncStorage.removeItem(key);

    } catch(err) {

      console.log('Something went wrong with storage.', err);
    }
  }  

  
}

export { StorageHelper };