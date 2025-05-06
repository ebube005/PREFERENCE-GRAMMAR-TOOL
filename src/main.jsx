import React from "react";
//import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./FirstPage.jsx";
import ResultPage from "./Resultpage.jsx";
import "./index.css";

const root = document.getElementById("root");
// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<FirstPage />} />
//         <Route path="/result" element={<ResultPage />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

//     }
// }
// export default main
