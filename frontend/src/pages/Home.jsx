import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(data => {
        console.log(data);
        setArticles(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>News Articles</h1>

      {articles.map(article => (
        <div key={article._id} style={{ marginBottom: "16px" }}>
          <h3>{article.title}</h3>
          <p>{article.content.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}
