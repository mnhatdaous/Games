import React, { useEffect, useState } from 'react';
import { ScreenSizeProvider } from './ScreenSizeContext';
import GameList from "./components/GameList";
import { getGameList, IGame } from "./apis/getGameList";
import { getJackpotList, IJackpot } from "./apis/getJackpotList";

const navbarStyle = {
  backgroundColor: '#333',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: "60px",
  fontFamily: "monospace"
} as const;

const categoryListStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexGrow: '1',
  margin: 0,
  height: "100%",
} as const;

const categoryStyle = {
  padding: '10px',
  cursor: 'pointer',
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontSize: "20px",
  backgroundColor: "#8D63F",
} as const;

const otherCategories = ["ball", "virtual", "fun"];
const OTHER_CATEGORY = "others";

export interface ICategories {
  [key: string]: {
    games: IGame[];
  };
}

function categorizeGames(games: IGame[]): ICategories {
  const categories: ICategories = {};
  games.forEach(game => {
    game.categories.forEach(category => {
      if (otherCategories.includes(category)) {
        if (!categories[OTHER_CATEGORY]) {
          categories[OTHER_CATEGORY] = { games: [] };
        }
        categories[OTHER_CATEGORY].games.push(game);
      } else {
        if (!categories[category]) {
          categories[category] = { games: [] };
        }
        categories[category].games.push(game);
      }
    });
  });

  return categories;
}

export default function App() {
  const [jackpots, setJackpots] = useState<IJackpot[]>([]);
  const [categories, setCategories] = useState<ICategories>({});
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    const getGameListFunc = async () => {
      const response = await getGameList();
      const games = response.data;
      setCategories(categorizeGames(games));
    }
    getGameListFunc();
  }, []);

  const getJackpotListFunc = async () => {
    const response = await getJackpotList();
    const jackpots = response.data;
    setJackpots(jackpots);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getJackpotListFunc();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScreenSizeProvider>
      <nav style={navbarStyle}>
        <ul style={categoryListStyle}>
          {Object.keys(categories).map((categoryName, index) => {
            return (
              <li
                key={`${index}-${Math.random()}`}
                style={{
                  ...categoryStyle, backgroundColor: categoryName === activeCategory ? "#90C300" : "#8D63F"
                }}
                onClick={() => setActiveCategory(categoryName)}
              >
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </li>
            )
          })}
        </ul>
      </nav>

      <GameList
        jackpots={jackpots}
        category={activeCategory}
        games={categories[activeCategory] ? categories[activeCategory].games : []}
      />
    </ScreenSizeProvider>
  );
}
