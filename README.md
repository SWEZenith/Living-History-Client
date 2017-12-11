# Living-History-Client


This is a react native application to keep memories of human beings alive by creating web annotations on image or textual contents or viewing web annotations of contents. Web annotations will be standardized according to web annotation data model definition of W3C.

## Sandbox Environment

Firstly, you need to install expo in order to run Living History application on sandbox environment. Install expo through following links.

<div style="display:inline-block">
	<a target="_blank" href="https://itunes.apple.com/app/apple-store/id982107779?ct=www&mt=8" >
	<img src="https://github.com/bulentrahimkazanci/Living-History-Client/blob/master/assets/app-store.png" 
		 width="200" 
		 style="display:inline;"/>
	</a>
	<a target="_blank" href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www" >
	<img src="https://github.com/bulentrahimkazanci/Living-History-Client/blob/master/assets/play-store.png" 
		 width="200" 
		 style="display:inline;"/>
	</a>
 </div>


Scan following QR code from expo application and let it amaze you!

<img src="https://github.com/bulentrahimkazanci/Living-History-Client/blob/master/assets/living-memories-qr.png"/>


## Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [NPM](https://www.npmjs.com/get-npm)
* [React native cli](https://www.npmjs.com/package/react-native-cli)
* iOS or Android SDK
* [Simulator](https://docs.genymotion.com/Content/01_Get_Started/Installation.htm)

## How to run on local

Open Terminal, then type command:

> ```git clone git@github.com:SWEZenith/Living-History-Client.git```

Go to project folder :

> ```cd Living-History-Client```

Type following command to install dependencies of project:

> ```npm install```

You must have ANDROID_HOME environtment variable, to check if you already have, type in your terminal :

> ```echo $ANDROID_HOME```

If blank, you can read at [HERE](https://goo.gl/XSBmwE)

Make sure you have already installed React Native globally by running this command :

> ```sudo npm install -g react-native-cli```

At this point, you should be able to run the project. To run your project on your device/emulator at Debug configuration, type :

> ```npm run android-dev```

Or if you want to run at iOS simulator, run:

> ```npm run ios-dev```

If you have error message like Execution failed for task ':app:dexDebug'. run this on your terminal :

> ```npm run android-clean```
