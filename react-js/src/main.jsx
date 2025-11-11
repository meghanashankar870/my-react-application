import React from "react";//Loads React core library and Enables JSX and component logic
import ReactDOM from "react-dom/client";//Displays UI in browser
import App from "./App.jsx";//Imports root app component and Starts your main UI
import "./gpf.css";//Loads your styles and Applies CSS globally

//putting (attaching) your React app’s UI elements onto the actual web page (DOM).
ReactDOM.createRoot(document.getElementById("root")).render(
  //Debugging tool and Catches common issues during development
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);
