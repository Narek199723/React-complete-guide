import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/store/AuthContextProvider";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <AuthContextProvider>
        <Router>
            <App />
        </Router>
    </AuthContextProvider>,
    document.getElementById("root")
);
