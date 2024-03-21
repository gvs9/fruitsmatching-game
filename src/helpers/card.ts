export const fruits = ["\u{1F34E}", "\u{1F34A}", "\u{1F347}", "\u{1F349}", "\u{1F353}", "\u{1F34D}", "\u{1F96D}", "\u{1F352}", "\u{1F34B}", "\u{1F34C}"]

export function shuffleCards() {
  return [...fruits, ...fruits].sort(() => Math.random() - 0.5).map((symbol) => ({ status: "faceup", symbol }))
}



