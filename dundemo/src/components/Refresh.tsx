interface RefreshProps {
  selectedCategory: "adventure" | "character";
  onRefresh: () => void;
}

export default function Refresh({ selectedCategory, onRefresh }: RefreshProps) {
  return (
    <div className="refresh-button">
      {selectedCategory === "adventure" && <button onClick={onRefresh}>갱신버튼</button>}
    </div>
  );
}
