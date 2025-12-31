import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
