import React from "react";
import Game from "./Game";
import { IGame } from "../apis/getGameList";
import { IJackpot } from "../apis/getJackpotList";

const gameListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
} as const;

const categoryTop = "top";
const categoryNew = "new";

const getRibbon = (categories: string[], category: string): string => {
    const isTop = categoryTop !== category && categories.includes(categoryTop);
    const isNew = categoryNew !== category && categories.includes(categoryNew);
    if (isTop) {
        return categoryTop;
    } else if (isNew) {
        return categoryNew;
    }
    return "";
}

interface IProps {
    category: string;
    games: IGame[];
    jackpots: IJackpot[];
}

export default function GameList({ games, jackpots, category }: IProps) {
    return (
        <div style={gameListStyle}>
            {games.map((game, index) => {
                const ribbonName = getRibbon(game.categories, category);
                return (
                    <Game
                        key={index}
                        gameId={game.id}
                        imageSrc={game.image}
                        ribbonName={ribbonName}
                        gameName={game.name}
                        jackpots={jackpots}
                    />
                )
            })}
        </div>
    );
}
