import React from "react";

export default function ArticleCard({ article }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      {article.references?.length > 0 && (
        <ul>
          {article.references.map((ref, idx) => (
            <li key={idx}>
              <a href={ref} target="_blank" rel="noopener noreferrer">{ref}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
