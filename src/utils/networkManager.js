import * as constants from '@utils/constants';

/**
 *  Http call processor.
 */
class NetworkManager {

  /**
   * Creates headers according to given content type value.
   */
  static headers(contentType) {

    let retVal = {};

    if(contentType == ContentTypes.json){

      retVal = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json'
      }

    } else if (contentType == ContentTypes.jsonLD){
      
      retVal = {
        'Accept': 'application/ld+json; profile="http://www.w3.org/ns/anno.jsonld"',
        'Content-Type': 'application/ld+json',
        'dataType': 'json+ld'
      }
    }
    
    return retVal;
  }

  /**
   *  Fires a get method.
   */
  static get(route, contentType) {

    return this.xhr(route, null, 'GET', contentType);
  }

  /**
   *  Fires a put method.
   */
  static put(route, body, contentType) {

    return this.xhr(route, body, 'PUT', contentType)
  }

  /**
   *  Fires a post method.
   */
  static post(route, body, contentType) {

    return this.xhr(route, body, 'POST', contentType)
  }

  /**
   *  Fires a delete method.
   */
  static delete(route, body, contentType) {

    return this.xhr(route, body, 'DELETE', contentType)
  }

  /**
   *  Makes a http call.
   */
  static xhr(route, body, verb, contentType) {

    const url = `${constants.API_URI}${route}`;

    let options = Object.assign({ method: verb }, body ? { body: JSON.stringify(body) } : null );

    options.headers = NetworkManager.headers(contentType);

    return fetch(url, options).then( response => {

      let json = response.json();

      if (response.ok)
        return json;
      
      return json.then(err => { throw err });

    });
  }
}

/**
 *  Enumeration of content types.
 */
class ContentTypes { 

  static json = 'json';

  static jsonLD = 'jsonLD';
}

export { NetworkManager, ContentTypes };