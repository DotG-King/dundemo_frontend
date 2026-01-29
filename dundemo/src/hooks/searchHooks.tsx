import { useState } from "react";
import apiClient from "../api/apiClient";

type SearchParams = {
    category: string;
    serverName: string;
    characterName: string;
    adventureName: string;
}

export const useSearch = () => {
    const [characterCards, setCharacterCards] = useState<CharacterCardProps[] | null>(null);
    const [adventureClearCount, setAdventureClearCount] = useState<adventureClearCount | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastParams, setLastParams] = useState<SearchParams | null>(null);

    const executeSearch = async (category: string, serverName: string, characterName: string, adventureName: string) => {
        setLoading(true);
        setError(null);
        setCharacterCards(null);
        
        const params = { category, serverName, characterName, adventureName };
        setLastParams(params);

        console.log(category, serverName, characterName, adventureName);

        try {
            let response;
            if (category === "character") {
                response = await apiClient.post(
                     "/api/v1/character/count",
                    { serverName: serverName, characterName: characterName }
                );
            } else if (category === "adventure") {
                response = await apiClient.post(
                    "/api/v1/adventure",
                    { adventureName: adventureName }
                );
                setAdventureClearCount(response?.data.data);
            }
            setCharacterCards(response?.data.data.characterList);
            console.log(response?.data.data);
        } catch (err) {
            setError("데이터를 가져오는 중 오류가 발생했습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const refresh = () => {
        if (lastParams) {
            executeSearch(lastParams.category, lastParams.serverName, lastParams.characterName, lastParams.adventureName);
        }
    };

    return { characterCards, adventureClearCount, loading, error, executeSearch, refresh };
}