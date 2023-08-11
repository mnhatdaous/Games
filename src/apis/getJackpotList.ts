import axios from "axios";

export interface IJackpot {
    game: string;
    amount: number;
}

export interface IResponse {
    data: IJackpot[];
}

export const getJackpotList = () => {
    return axios({
        method: 'get',
        url: 'https://stage.whgstage.com/front-end-test/jackpots.php',
      }) as Promise<IResponse>;
};
