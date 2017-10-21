class NetworkManager {

  static host = 'http://localhost:8080/api';

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

  static get(route, contentType) {
    return this.xhr(route, null, 'GET', contentType);
  }

  static put(route, body, contentType) {
    return this.xhr(route, body, 'PUT', contentType)
  }

  static post(route, body, contentType) {
    return this.xhr(route, body, 'POST', contentType)
  }

  static delete(route, body, contentType) {
    return this.xhr(route, body, 'DELETE', contentType)
  }

  static xhr(route, body, verb, contentType) {

    const url = `${NetworkManager.host}${route}`;
    let options = Object.assign({ method: verb }, body ? { body: JSON.stringify(body) } : null );

    options.headers = NetworkManager.headers(contentType);

    return fetch(url, options).then( response => {

      let json = response.json();

      if (response.ok)
        return json;
      
      return json.then(err => {throw err} );

    });
  }
}

class ContentTypes { 

  static json = 'json';

  static jsonLD = 'jsonLD';
}

export { NetworkManager, ContentTypes };