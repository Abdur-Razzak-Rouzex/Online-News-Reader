import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordsToNumbers from 'words-to-numbers'

const alanKey =
  "1b068b79809a982bf798766e019a85b02e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newsHeadLines") {
          setnewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((preActiveArticle) => preActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article = articles[parsedNumber-1]
          
          if(parsedNumber > 20){
            alanBtn().playText("Please try searching within the card numbers")
          } else if(article){
            window.open(article.url, "_blank");
            alanBtn().playText('Opening...')
          }
        }
      },
    });
  }, []);

  const classes = useStyles();

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="Alan Logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
