export interface Deck {
  title: string;
  category: string;
  cards: number;
  students: number;
  shares: number;
}

export interface FlashcardData {
  question: string;
  answer: string;
}

export interface DeckData {
  title: string;
  description?: string;
  subject: string;
  flashcards: FlashcardData[];
}

export interface DeckDataList {
  title: string;
  description?: string;
  subject: string;
  flashcards: FlashcardData[];
  creator: {
    id: number;
    username: string;
    email: string;
  };
}
