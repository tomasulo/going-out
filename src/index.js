import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import styles from "./index.css";
import Provider from "redux";
import { store } from "./redux/eventReducer";

ReactDOM.render(
		<App />,
	document.getElementById("root")
);
