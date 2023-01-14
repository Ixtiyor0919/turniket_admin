import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
// import locale from "antd/es/locale/ru_RU";
import App from "./App";
import "antd/dist/antd.css";
import "./index.css";
// import locale from "antd/locale/zh_CN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* <ConfigProvider lcale={locale}> */}
                <App />
            {/* </ConfigProvider> */}
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
