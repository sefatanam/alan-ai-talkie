import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "47da0455570dca09e71f683158abd2f42e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === "testCommand") {
          alert("this code is tested");
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>Alan Ai news app</h1>
    </div>
  );
};

export default App;
