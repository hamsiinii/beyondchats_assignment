import React, { useEffect, useState } from "react";
import { fetchArticles } from "./services/api";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Beyond Chats Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
}

export default App;
