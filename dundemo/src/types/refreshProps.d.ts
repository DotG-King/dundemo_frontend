interface RefreshProps {
    category: "adventure" | "character";
    onRefresh: (params: { adventureName?: string; }) => void;
    loading: boolean;
}