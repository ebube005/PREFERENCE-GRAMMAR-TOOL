import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./ResultPage.css";
//last page
function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { tableData, pronunciation } = location.state || {};

  useEffect(() => {
    if (!tableData || !pronunciation) {
      navigate("/");
    }
  }, [tableData, pronunciation, navigate]);

  const downloadCSV = () => {
    const csvContent = tableData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "operability_table.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="result-container">
      <h2>PREFERENCE GRAMMAR GENERATOR TOOL OUTPUT RESULT</h2>

      <div className="table-wrapper">
        <table className="output-table">
          <tbody>
            {tableData &&
              tableData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <p className="pronunciation">
        Based on the criteria and works, the Nigerian Standard English
        pronunciation of the word is: <strong>{pronunciation}</strong>
      </p>

      <button className="download-btn" onClick={downloadCSV}>
        DOWNLOAD CSV FORMAT
      </button>
    </div>
  );
}

export default ResultPage;
