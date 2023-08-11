import React, { useEffect, useState } from "react";
import { useMobileScreenSize } from '../ScreenSizeContext';

import { IJackpot } from "../apis/getJackpotList";

const productStyle = {
    margin: '20px',
    background: 'white',
    border: '1px solid #333',
    position: 'relative',
    zIndex: '90',
} as const;

const ribbonWrapperStyle = {
    width: '85px',
    height: '88px',
    overflow: 'hidden',
    position: 'absolute',
    top: '-3px',
    left: '-3px',
} as const;

const ribbonStyle = {
    font: 'bold 15px sans-serif',
    textAlign: 'center',
    WebkitTransform: 'rotate(-45deg)',
    MozTransform: 'rotate(-45deg)',
    MsTransform: 'rotate(-45deg)',
    OTransform: 'rotate(-45deg)',
    position: 'relative',
    padding: '7px 0',
    top: '15px',
    left: '-30px',
    width: '120px',
    backgroundColor: '#ebb134',
    color: '#fff',
} as const;

const jackpotStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '0px',
    backgroundColor: '#ff0000',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '5px 10px',
    zIndex: '1',
} as const;

const imageWrapperStyle = {
    width: '100%',
    height: '100%',
} as const;

const btnStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    backgroundColor: '#555',
    color: 'white',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    textAlign: 'center',
    ":hover": {
        backgroundColor: 'black',

    }
} as const;

interface IProps {
    gameId: string;
    ribbonName?: string;
    imageSrc: string;
    gameName: string;
    jackpots: IJackpot[];
}

export default function Game({ gameId, ribbonName, imageSrc, gameName, jackpots }: IProps) {
    const isMobileSize = useMobileScreenSize();
    const [buttonVisible, setButtonVisible] = useState<boolean>(false);
    const [jackpot, setJackpot] = useState<number>(0);

    useEffect(() => {
        const game = jackpots.find(jackpot => jackpot.game === gameId);

        setJackpot(game?.amount || 0);
    }, [jackpots, gameId]);

    return (
        <div
            style={productStyle}
            onMouseEnter={() => { setButtonVisible(true) }}
            onMouseLeave={() => { setButtonVisible(false) }}
        >
            {ribbonName ? (
                <div style={ribbonWrapperStyle}>
                    <div style={ribbonStyle}>{ribbonName}</div>
                </div>
            ) : null}
            <img style={imageWrapperStyle} alt="game" src={imageSrc}></img>
            <button style={{ ...btnStyle, display: !isMobileSize && buttonVisible ? "" : "none" }}>Play {gameName}</button>
            {jackpot ? <div style={jackpotStyle}>Jackpot:  €{jackpot}</div> : null}

        </div >
    );
}
