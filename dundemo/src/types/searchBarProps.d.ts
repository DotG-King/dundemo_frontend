interface SearchBarProps {
    category: "adventure" | "character";
    onSearch: (params: { serverName?: string; characterName?: string; adventureName?: string }) => void;
    loading: boolean;
}