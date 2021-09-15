import axios from "axios";
import { useCallback, useState } from "react"
import { api } from "../api";
import { useAppSelector } from "../store/store-hooks";

interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    token?: string;
    token_created_at?: string;
    created_at: string;
    updated_at: string;
}
interface Game {
    id: string;
    type: string;
    description: string;
    range: number;
    price: number;
    "max-number": number;
    color: string;
    "min-cart-value": number;
    created_at: string;
    updated_at: string;
}
interface Data {
    id: number;
    gameNumbers: string;
    user_id: number;
    game_id: number;
    price: number;
    game_date: string;
    created_at: string;
    updated_at: string;
    user: User
    game: Game;
}

interface Bets {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
    data?: Data[]
}
export default function useApi() {
    const [betsData, setBets] = useState<Bets>();
    const token = useAppSelector(state => state.user.token);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [finish, setFinish] = useState<boolean>(false);
    const fetchData = useCallback(async (page: number, games?: string[], token2?: string) => {
        setIsLoading(true);
        console.log('loading', page, games, token2);
        const response = await api.get(`/gamble?page=${page + 1}&games=${games}`, { headers: { Authorization: `Bearer ${token2 ? token2 : token}` } }).then(response => {
            // console.log('DATA', response.data)
            console.log('funcionou')
            setBets(response.data);
            setIsLoading(false);
            console.log('loaded');
            return true;
        })
            .catch(err => {
                console.log('errr', err.message);
                setIsLoading(false);
                return true
            })
        if (response) {
            setFinish(true);
        }
    }, [token])

    return {
        fetchData,
        betsData,
        isLoading,
        finish
    }



}