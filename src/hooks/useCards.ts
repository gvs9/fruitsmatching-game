
import { useEffect, useRef, useState } from "react";
import { shuffleCards } from "../helpers/card";

interface Card {
  status: string;
  symbol: string;
}

const MAX_TRIES = 10;

export default function useCards() {
  const [cards, setCards] = useState<Card[]>(shuffleCards());
  const [tries, setTries] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const disable = useRef<boolean>(true);
  const prevIndex = useRef<number>(-1);

  useEffect(() => {
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((c) => ({ ...c, status: "facedown" }))
      );
      disable.current = false;
    }, 3000);
  }, []);

  const updateCardStatus = (cardArr: Card[], status: string) => {
    cardArr.forEach((card) => (card.status = status));
    setCards([...cards]);
  };

  const handleClick = (i: number) => {
    if (disable.current) return;

    const currCard = cards[i];
    const prevCard = cards[prevIndex.current];

    if (currCard.status === "matched") return;

    updateCardStatus([currCard], "faceup");

    if (!prevCard || prevIndex.current === i) {
      prevIndex.current = i;
      return;
    }

    if (currCard.symbol === prevCard.symbol) {
      updateCardStatus([currCard, prevCard], "matched");
      setMatches((prevMatches) => prevMatches + 1);
      setProgress((prevProgress) => (prevProgress + (100 / (MAX_TRIES / 2))));
      if (matches + 1 === 10) {
        window.dispatchEvent(new CustomEvent("allMatched"));
      }
    } else {
      disable.current = true;
      setTimeout(() => {
        updateCardStatus([currCard, prevCard], "facedown");
        disable.current = false;
      }, 1000);
    }

    prevIndex.current = -1;
    setTries((prevTries) => prevTries + 1);
  };

  return { cards, handleClick, progress, matches };
}
