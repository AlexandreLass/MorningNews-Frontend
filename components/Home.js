import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value)
  const hiddens = useSelector((state) => state.hiddenArticles.value)
  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch('https://morning-news-backend-zeta.vercel.app/articles')
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

//Ce code filtre le tableau articlesData pour ne conserver que les articles dont le titre n'est pas inclus dans le tableau hiddens.
// Les articles dont le titre est dans hiddens sont exclus du tableau résultant.
  const filtre = articlesData.filter((data) => !hiddens.includes(data.title))
  
  const articles = filtre.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    return <Article key={i} {...data} isBookmarked={isBookmarked}/>;
  });

  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
