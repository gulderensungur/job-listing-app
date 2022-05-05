import React from "react";
import styles from "./styles.module.css";

function JobBoardComponent({
  job: {
    id,
    isNew,
    company,
    logo,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  },
  handleTagClick,
}) {
  const tags = [role, level, ...(tools || [])];

  if (tools) {
    tags.push(...tools);
  }

  if (languages) {
    tags.push(...languages);
  }

  return (
    <div
      // className={`flex bg-white shadow-md m-4 p-6 rounded ${
      //   featured && "border-l-4 border-teal-500 border-solid"
      // }`}
      className={`${styles.jobBoard} ${featured && styles.featuredJob}`}
    >
      <div className={styles.boardWrapper}>
        <div className={styles.imgWrapper}>
          <img src={logo} alt={company} />
        </div>
        <div className={styles.jobContent}>
          <h3>
            {company}
            {isNew && <span className={styles.new}>New!</span>}
            {featured && <span className={styles.featured}>Featured</span>}
          </h3>
          <h2>{position}</h2>
          <p>
            {postedAt} · {contract} · {location}
          </p>
        </div>
      </div>

      <div className={styles.tags}>
        {tags
          ? tags.map((tag) => (
              <span className={styles.tag} onClick={() => handleTagClick(tag)}>
                {tag}
              </span>
            ))
          : ""}
      </div>
    </div>
  );
}

export default JobBoardComponent;
