import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./style.js";
import { Typography } from "@material-ui/core";
import wordsToNumbers from "words-to-number";

const alanKey =
  "47da0455570dca09e71f683158abd2f42e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((preActiveArticle) => preActiveArticle + 1);
        } else if (command === "open") {
          const parseNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          const article = articles[parseNumber - 1];

          if (parseNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        {/* <Typography variant="h5">Your Personal News Reader</Typography> */}
        <img
          src="https://news.talkie.ai/wp-content/uploads/2018/12/1obszar-roboczy-1.svg"
          className={classes.alanLogo}
          alt="Takie News Logo"
        />
      </div>

      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
