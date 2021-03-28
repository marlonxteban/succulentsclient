# succulentsclient
Fron-End client for [succulents project](https://github.com/marlonxteban/succulents) (Based on John Papa [Vue: Getting Started example app](https://github.com/johnpapa/vue-getting-started)).

## App Setup
1. Install the packages.
``` bash
npm install
```
Note: If there is an error with the package `sass-loader` after the install, run the following instruction:
``` bash
npm install --rebuild sass-loader
```

2. Config API url.
In the folder `src/shared/config.js` the text `'http://127.0.0.1:5000'` shows where the local API is running.

3. Run the local server.
Run:
``` bash
npm run serve
```

4. This app is live at [succulentsclient](https://succulentsclient.herokuapp.com/).

### Notes:
- If have problems after a refreshes the page or restart the server when you are logged in, please open the developer tools in the browser go to developer tools go to `storage` and delete cookies, local storage and session storage.
- If the list of families not loads fast in the live app, please go to [mysucculents](https://mysucculents.herokuapp.com/) and refresh the page if the list not loads yet.