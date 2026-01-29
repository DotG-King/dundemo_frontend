interface searchResult {
    data: CharacterCardProps;
    loading: boolean;
    error: string | null;
    executeSearch: (category: string, serverName: string, characterName: string, adventureName:string) => Promise<void>;
}