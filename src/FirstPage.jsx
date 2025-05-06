import { StrictMode, useState } from "react";
//import { createRoot } from "react-dom/client";
import "./index.css";
import AudioUploader from "./components/FileUploader";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//import App from "./App.jsx";
const criterias = [
  "International Acceptance ",
  "Phonetic Simplicity",
  "Paedagogic Convenience",
  "Contrastiveness",
  "Frequency",
  "Disambiguity",
];
function FirstPage() {
  const [sliders, setSliders] = useState(
    criterias.reduce((acc, cur) => {
      acc[cur] = 4;
      return acc;
    }, {})
  );
  return (
    <div className="container">
      <AudioUploader />
      <Search />
      <CriteriaSliders sliders={sliders} setSliders={setSliders} />
      <SUBMIT sliders={sliders} />
    </div>
  );
}

function Head() {
  return <AudioUploader />;
}
function Search() {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="search"
        value=""
        placeholder="Input word to analyze"
        className="search-input"
      />
    </div>
  );
}
function CriteriaSliders({ sliders, setSliders }) {
  const handleChange = (criterion, value) => {
    setSliders({
      ...sliders,
      [criterion]: Number(value),
    });
  };

  return (
    <div className="criteria-box">
      <p className="instruction">Rank the importance of each criteria</p>
      {criterias.map((criterion) => (
        <div key={criterion} className="slider-wrapper">
          <label className="label">{criterion} </label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="6"
              value={sliders[criterion]}
              onChange={(e) => handleChange(criterion, e.target.value)}
              className="slider"
            />
            <div
              className="bubble"
              style={{ left: `${((sliders[criterion] - 1) / 6) * 100}%` }}
            >
              {" "}
              {sliders[criterion]}
            </div>
          </div>
        </div>
      ))}
      <p className="note">
        {" "}
        Note: 1 represents most importance and 6 represents least importance
      </p>
    </div>
  );
}
function SUBMIT({ sliders }) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const values = Object.values(sliders);
    const uniqueValues = new Set(values);

    if (uniqueValues.size !== values.length) {
      alert(" Please assign a unique rank to each criterion.");
    } else {
      // Replace this with actual computed data from your backend or logic
      const computedTable = [
        ["Phoneme", "I-Ac", "ContR", "Freq", "DisaM", "Pho-S", "Ped-C"],
        ["tink", "✔️", "", "", "❌", "", ""],
        ["sink", "❌", "", "", "❌", "", ""],
        ["zink", "", "", "", "", "❌", ""],
        ["think", "", "", "", "", "", ""],
      ];
      const bestPronunciation = "think";
      alert("Submitted successfully!");
      navigate("/result", {
        state: { tableData: computedTable, pronunciation: bestPronunciation },
      });
    }
  };
  return (
    <div>
      <button className="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
}
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <FirstPage />
//   </StrictMode>
// );

export default FirstPage;
