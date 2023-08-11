import axios from "axios";

export interface IGame {
    categories: string[];
    name: string;
    image: string;
    id: string;
}

export interface IResponse {
    data: IGame[];
}

export const getGameList = () => {
    return axios({
        method: 'get',
        url: 'https://stage.whgstage.com/front-end-test/games.php',
      }) as Promise<IResponse>;
};
