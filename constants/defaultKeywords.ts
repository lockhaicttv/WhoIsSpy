// Default free keywords - 100 pairs across various categories
export interface KeywordPair {
  civilian: string;
  spy: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Localized keyword pair — one entry per keyword, all locales in one object
export interface LocalizedKeywordPair {
  /** Translations keyed by locale code. 'en' is required. */
  translations: {
    [locale: string]: { civilian: string; spy: string };
  };
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

/** Flatten localized keywords into per-locale KeywordPair arrays */
export const flattenByLocale = (
  localized: LocalizedKeywordPair[],
  locale: string
): KeywordPair[] => {
  return localized
    .filter((kw) => kw.translations[locale])
    .map((kw) => ({
      civilian: kw.translations[locale].civilian,
      spy: kw.translations[locale].spy,
      category: kw.category,
      difficulty: kw.difficulty,
    }));
};

/** Get all supported locale codes from a localized keyword set */
export const getKeywordLocales = (localized: LocalizedKeywordPair[]): string[] => {
  const locales = new Set<string>();
  localized.forEach((kw) => Object.keys(kw.translations).forEach((l) => locales.add(l)));
  return Array.from(locales);
};

export const DEFAULT_KEYWORDS: KeywordPair[] = [
  // FOOD & DRINKS (20 pairs)
  { civilian: 'Apple', spy: 'Pear', category: 'Food', difficulty: 'easy' },
  { civilian: 'Coffee', spy: 'Tea', category: 'Drinks', difficulty: 'easy' },
  { civilian: 'Pizza', spy: 'Burger', category: 'Food', difficulty: 'easy' },
  { civilian: 'Rice', spy: 'Noodles', category: 'Food', difficulty: 'easy' },
  { civilian: 'Chocolate', spy: 'Candy', category: 'Food', difficulty: 'easy' },
  { civilian: 'Bread', spy: 'Toast', category: 'Food', difficulty: 'easy' },
  { civilian: 'Milk', spy: 'Yogurt', category: 'Drinks', difficulty: 'medium' },
  { civilian: 'Steak', spy: 'Pork Chop', category: 'Food', difficulty: 'medium' },
  { civilian: 'Orange Juice', spy: 'Lemonade', category: 'Drinks', difficulty: 'easy' },
  { civilian: 'Sushi', spy: 'Sashimi', category: 'Food', difficulty: 'hard' },
  { civilian: 'Ice Cream', spy: 'Frozen Yogurt', category: 'Food', difficulty: 'medium' },
  { civilian: 'Soup', spy: 'Stew', category: 'Food', difficulty: 'medium' },
  { civilian: 'Cookie', spy: 'Biscuit', category: 'Food', difficulty: 'medium' },
  { civilian: 'Cake', spy: 'Pie', category: 'Food', difficulty: 'easy' },
  { civilian: 'Wine', spy: 'Beer', category: 'Drinks', difficulty: 'easy' },
  { civilian: 'Donut', spy: 'Muffin', category: 'Food', difficulty: 'easy' },
  { civilian: 'Pancake', spy: 'Waffle', category: 'Food', difficulty: 'easy' },
  { civilian: 'Honey', spy: 'Syrup', category: 'Food', difficulty: 'medium' },
  { civilian: 'Butter', spy: 'Margarine', category: 'Food', difficulty: 'hard' },
  { civilian: 'Popcorn', spy: 'Chips', category: 'Food', difficulty: 'easy' },

  // ANIMALS (15 pairs)
  { civilian: 'Dog', spy: 'Wolf', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Cat', spy: 'Tiger', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Horse', spy: 'Zebra', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Butterfly', spy: 'Moth', category: 'Animals', difficulty: 'medium' },
  { civilian: 'Frog', spy: 'Toad', category: 'Animals', difficulty: 'hard' },
  { civilian: 'Turtle', spy: 'Tortoise', category: 'Animals', difficulty: 'hard' },
  { civilian: 'Dolphin', spy: 'Shark', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Eagle', spy: 'Hawk', category: 'Animals', difficulty: 'medium' },
  { civilian: 'Penguin', spy: 'Puffin', category: 'Animals', difficulty: 'hard' },
  { civilian: 'Lion', spy: 'Cheetah', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Elephant', spy: 'Hippo', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Rabbit', spy: 'Hare', category: 'Animals', difficulty: 'hard' },
  { civilian: 'Snake', spy: 'Lizard', category: 'Animals', difficulty: 'easy' },
  { civilian: 'Crocodile', spy: 'Alligator', category: 'Animals', difficulty: 'hard' },
  { civilian: 'Monkey', spy: 'Gorilla', category: 'Animals', difficulty: 'easy' },

  // TRANSPORTATION (10 pairs)
  { civilian: 'Car', spy: 'Bike', category: 'Transport', difficulty: 'easy' },
  { civilian: 'Train', spy: 'Subway', category: 'Transport', difficulty: 'medium' },
  { civilian: 'Airplane', spy: 'Helicopter', category: 'Transport', difficulty: 'easy' },
  { civilian: 'Bus', spy: 'Van', category: 'Transport', difficulty: 'easy' },
  { civilian: 'Boat', spy: 'Ship', category: 'Transport', difficulty: 'medium' },
  { civilian: 'Motorcycle', spy: 'Scooter', category: 'Transport', difficulty: 'easy' },
  { civilian: 'Taxi', spy: 'Uber', category: 'Transport', difficulty: 'easy' },
  { civilian: 'Truck', spy: 'Trailer', category: 'Transport', difficulty: 'medium' },
  { civilian: 'Skateboard', spy: 'Roller Skates', category: 'Transport', difficulty: 'easy' },
  { civilian: 'Hot Air Balloon', spy: 'Parachute', category: 'Transport', difficulty: 'hard' },

  // MUSIC & INSTRUMENTS (10 pairs)
  { civilian: 'Guitar', spy: 'Piano', category: 'Instruments', difficulty: 'easy' },
  { civilian: 'Violin', spy: 'Cello', category: 'Instruments', difficulty: 'medium' },
  { civilian: 'Drum', spy: 'Cymbal', category: 'Instruments', difficulty: 'easy' },
  { civilian: 'Flute', spy: 'Clarinet', category: 'Instruments', difficulty: 'hard' },
  { civilian: 'Trumpet', spy: 'Trombone', category: 'Instruments', difficulty: 'medium' },
  { civilian: 'Microphone', spy: 'Speaker', category: 'Music', difficulty: 'easy' },
  { civilian: 'Headphones', spy: 'Earbuds', category: 'Music', difficulty: 'easy' },
  { civilian: 'DJ', spy: 'Producer', category: 'Music', difficulty: 'hard' },
  { civilian: 'Concert', spy: 'Festival', category: 'Music', difficulty: 'medium' },
  { civilian: 'Singer', spy: 'Rapper', category: 'Music', difficulty: 'easy' },

  // SPORTS & GAMES (10 pairs)
  { civilian: 'Soccer', spy: 'Football', category: 'Sports', difficulty: 'easy' },
  { civilian: 'Basketball', spy: 'Volleyball', category: 'Sports', difficulty: 'easy' },
  { civilian: 'Tennis', spy: 'Badminton', category: 'Sports', difficulty: 'easy' },
  { civilian: 'Swimming', spy: 'Diving', category: 'Sports', difficulty: 'easy' },
  { civilian: 'Boxing', spy: 'Wrestling', category: 'Sports', difficulty: 'easy' },
  { civilian: 'Chess', spy: 'Checkers', category: 'Games', difficulty: 'easy' },
  { civilian: 'Poker', spy: 'Blackjack', category: 'Games', difficulty: 'medium' },
  { civilian: 'Running', spy: 'Jogging', category: 'Sports', difficulty: 'hard' },
  { civilian: 'Skiing', spy: 'Snowboarding', category: 'Sports', difficulty: 'easy' },
  { civilian: 'Golf', spy: 'Mini Golf', category: 'Sports', difficulty: 'easy' },

  // TECHNOLOGY (10 pairs)
  { civilian: 'Phone', spy: 'Tablet', category: 'Technology', difficulty: 'easy' },
  { civilian: 'Laptop', spy: 'Desktop', category: 'Technology', difficulty: 'easy' },
  { civilian: 'Keyboard', spy: 'Mouse', category: 'Technology', difficulty: 'easy' },
  { civilian: 'TV', spy: 'Monitor', category: 'Technology', difficulty: 'easy' },
  { civilian: 'Camera', spy: 'Webcam', category: 'Technology', difficulty: 'easy' },
  { civilian: 'Facebook', spy: 'Instagram', category: 'Technology', difficulty: 'easy' },
  { civilian: 'YouTube', spy: 'TikTok', category: 'Technology', difficulty: 'easy' },
  { civilian: 'Google', spy: 'Bing', category: 'Technology', difficulty: 'easy' },
  { civilian: 'Email', spy: 'Text Message', category: 'Technology', difficulty: 'easy' },
  { civilian: 'WiFi', spy: 'Bluetooth', category: 'Technology', difficulty: 'medium' },

  // NATURE & WEATHER (10 pairs)
  { civilian: 'Rain', spy: 'Snow', category: 'Weather', difficulty: 'easy' },
  { civilian: 'Sun', spy: 'Moon', category: 'Nature', difficulty: 'easy' },
  { civilian: 'Mountain', spy: 'Hill', category: 'Nature', difficulty: 'easy' },
  { civilian: 'Ocean', spy: 'Sea', category: 'Nature', difficulty: 'medium' },
  { civilian: 'River', spy: 'Stream', category: 'Nature', difficulty: 'medium' },
  { civilian: 'Forest', spy: 'Jungle', category: 'Nature', difficulty: 'medium' },
  { civilian: 'Cloud', spy: 'Fog', category: 'Weather', difficulty: 'easy' },
  { civilian: 'Thunder', spy: 'Lightning', category: 'Weather', difficulty: 'medium' },
  { civilian: 'Flower', spy: 'Plant', category: 'Nature', difficulty: 'easy' },
  { civilian: 'Tree', spy: 'Bush', category: 'Nature', difficulty: 'easy' },

  // HOUSEHOLD & OBJECTS (15 pairs)
  { civilian: 'Bed', spy: 'Couch', category: 'Household', difficulty: 'easy' },
  { civilian: 'Chair', spy: 'Stool', category: 'Household', difficulty: 'easy' },
  { civilian: 'Table', spy: 'Desk', category: 'Household', difficulty: 'easy' },
  { civilian: 'Lamp', spy: 'Candle', category: 'Household', difficulty: 'easy' },
  { civilian: 'Mirror', spy: 'Window', category: 'Household', difficulty: 'easy' },
  { civilian: 'Door', spy: 'Gate', category: 'Household', difficulty: 'easy' },
  { civilian: 'Refrigerator', spy: 'Freezer', category: 'Household', difficulty: 'medium' },
  { civilian: 'Oven', spy: 'Microwave', category: 'Household', difficulty: 'easy' },
  { civilian: 'Washing Machine', spy: 'Dryer', category: 'Household', difficulty: 'easy' },
  { civilian: 'Fan', spy: 'Air Conditioner', category: 'Household', difficulty: 'easy' },
  { civilian: 'Clock', spy: 'Watch', category: 'Objects', difficulty: 'easy' },
  { civilian: 'Book', spy: 'Magazine', category: 'Objects', difficulty: 'easy' },
  { civilian: 'Pen', spy: 'Pencil', category: 'Objects', difficulty: 'easy' },
  { civilian: 'Bag', spy: 'Backpack', category: 'Objects', difficulty: 'easy' },
  { civilian: 'Umbrella', spy: 'Raincoat', category: 'Objects', difficulty: 'easy' },
];

// Premium keyword packages that can be unlocked
export const PREMIUM_PACKAGES = {
  ADVANCED: 'advanced_pack',
  CULTURE: 'culture_pack',
  SCIENCE: 'science_pack',
  ENTERTAINMENT: 'entertainment_pack',
  ULTIMATE: 'ultimate_pack',
};

export const PACKAGE_NAMES = {
  [PREMIUM_PACKAGES.ADVANCED]: 'Advanced Pack',
  [PREMIUM_PACKAGES.CULTURE]: 'Culture & History Pack',
  [PREMIUM_PACKAGES.SCIENCE]: 'Science & Education Pack',
  [PREMIUM_PACKAGES.ENTERTAINMENT]: 'Entertainment Pack',
  [PREMIUM_PACKAGES.ULTIMATE]: 'Ultimate Pack (All)',
};
