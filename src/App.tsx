
import * as S from "./assets/styles/globalStyle";
import Card from "./components/Card";
import useCards from "./hooks/useCards";
import { useEffect } from "react";

import bananaImage from "./assets/images/bananaimages.jpeg";

export default function Game() {
  const { cards, handleClick, progress, matches } = useCards();

  useEffect(() => {
    const rewardHandler = () => {
      const bananaScreen = document.getElementById("banana-screen");
      if (bananaScreen) {
        bananaScreen.style.display = "block";
      }
    };
    window.addEventListener("allMatched", rewardHandler);
    return () => {
      window.removeEventListener("allMatched", rewardHandler);
    };
  }, []);

  return (
    <>
      <S.GlobalStyle />
      <S.Logo />
      <S.CardContainer>
        {cards.map((c, i) => (
          <Card key={i} select={() => handleClick(i)} symbol={c.symbol} status={c.status} />
        ))}
      </S.CardContainer>
      <S.RestartButton onClick={() => window.location.reload()}>RESTART ✓</S.RestartButton>
      <S.ProgressBarContainer>
        <S.ProgressBarFiller progress={progress} />
      </S.ProgressBarContainer>
     

      <S.BananaContainer id="banana-screen" style={{ display: "none" }}>
        <img src={bananaImage} alt="Big Banana" style={{ width: "100%", height: "100%" }} />
      </S.BananaContainer>
    </>
  );
}
