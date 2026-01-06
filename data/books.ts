export interface Book {
  title: string;
  author: string;
  image?: string;
  currentlyReading?: boolean;
  completedReading?: boolean;
}

export interface BookCategories {
  category: string;
  books: Book[];
}

export const bookCollection: BookCategories[] = [
  {
    category: "Personal Development",
    books: [
      {
        title: "The Road to Better Habits",
        author: "Darius Foroux",
        image: "/books/the-road-to-better-habits.jpg",
        completedReading: true,
      },
      {
        title: "Focus on what matters",
        author: "Darius Foroux",
        image: "/books/focus-on-what-matters.jpg",
        currentlyReading: true,
      },
      {
        title: "The Power of your Subconscious Mind",
        author: "Joseph Murphy",
        image: "/books/the-power-of-your-subconscious-mind.jpg",
        completedReading: true,
      },
      {
        title: "Do it Today",
        author: "Darius Foroux",
        image: "/books/do-it-today.jpg",
      },
      {
        title: "Think Straight",
        author: "Darius Foroux",
        image: "/books/think-straight.jpg",
      },
      {
        title: "Win your inner battles",
        author: "Darius Foroux",
        image: "/books/win-your-inner-battles.jpg",
      },
      {
        title: "What it takes to be free",
        author: "Darius Foroux",
        image: "/books/what-it-takes-to-be-free.jpg",
      },
    ],
  },
  {
    category: "Productivity",
    books: [
      {
        title: "Show your work",
        author: "Austin Kleon",
        image: "/books/show-your-work.jpg",
        completedReading: true,
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        image: "/books/deep-work.jpg",
        currentlyReading: true,
      },
    ],
  },
  {
    category: "Power & Strategy",
    books: [
      {
        title: "The 48 Laws of Power",
        author: "Robert Greene",
        image: "/books/the-48-laws-of-power.jpg",
      },
      {
        title: "Mastery",
        author: "Robert Greene",
        image: "/books/mastery.jpg",
      },
    ],
  },
  {
    category: "Finance & Business",
    books: [
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        image: "/books/the-psychology-of-money.jpg",
        completedReading: true,
      },
      {
        title: "Zero to One",
        author: "Peter Thiel",
        image: "/books/zero-to-one.jpg",
        completedReading: true,
      },
      {
        title: "Richest Man in Babylon",
        author: "George S. Clason",
        image: "/books/richest-man-in-babylon.jpg",
        completedReading: true,
      },
      {
        title: "Just Keep Buying",
        author: "Nick Maggiulli",
        image: "/books/just-keep-buying.jpg",
        completedReading: true,
      },
    ],
  },
  {
    category: "Fiction",
    books: [
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "/books/the-alchemist.jpg",
        completedReading: true,
      },
      {
        title: "The Archer",
        author: "Paulo Coelho",
        image: "/books/the-archer.jpg",
        completedReading: true,
      },
      {
        title: "Kafka on the Shore",
        author: "Mukarami",
        image: "/books/kafka-on-the-shore.jpg",
        currentlyReading: true,
      },
    ],
  },
];