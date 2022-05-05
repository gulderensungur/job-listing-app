import { useState, useEffect } from "react";
import JobBoardComponent from "./componenets/JobBoardComponent";
import data from "./assets/data.json";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({ role, level, languages, tools }) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];

    if (languages) {
      tags.push(...languages);
    }
    if (tools) {
      tags.push(...tools);
    }

    return filters.every((filter) => tags.includes(filter));
  };

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };

  const clearFilter = () => setFilters([]);

  const filteredJobs = jobs.filter(filterFunc);

  return (
    <div className="App">
      <div className="fullWidth">
        <header>
          <img src="/images/bg-header-desktop.svg" alt="background" />
        </header>
      </div>

      <div className="container">
        {filters.length > 0 && (
          <div className="filters">
            {filters.map((filter) => (
              <span onClick={() => handleFilterClick(filter)}>
                {filter}
                <span>&#10007;</span>
              </span>
            ))}
            <button onClick={clearFilter}>Clear</button>
          </div>
        )}

        {jobs.length === 0 ? (
          <p>Loading...</p>
        ) : (
          filteredJobs.map((job) => (
            <JobBoardComponent
              key={job.id}
              job={job}
              handleTagClick={handleTagClick}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
