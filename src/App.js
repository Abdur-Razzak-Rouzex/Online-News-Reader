import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "Paste your alan key here";

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
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try searching within the card numbers");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
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
      <div style={{width:"60%", height:"auto",  margin:"auto", alignItems:"center"}} className={classes.card}>
          <h3>HOW TO USE</h3>
          <ul style={{listStyleType:"none"}}>
            <li>Click on the <b style={{color: "yellow"}}>Microphone</b> button at the bottom right corner</li>
            <li>Click <b style={{color: "yellow"}}>Allow</b> to use Microphone for Talking with the website</li>
            <li>Say: <b style={{color: "yellow"}}>Give me the latest news</b></li>
            <li>Say: <b style={{color: "yellow"}}>GO BACK</b></li>
          </ul>
        </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
