import { useState } from "react";

import Title from "./components/Title";
import Category from "./components/Category";
import Refresh from "./components/Refresh";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

import { useSearch } from "./hooks/searchHooks";

import "./css/App.css";
import CharacterCard from "./components/CharacterCard";
import AdventureResult from "./components/AdventureResult";

export default function App() {
  const [searchCategory, setSearchCategory] = useState<"adventure" | "character">("character");
  const { characterCards, adventureClearCount, loading, error, executeSearch, refresh } = useSearch();
  
  const handelSearch = (params: {
    serverName?: string;
    characterName?: string;
    adventureName?:string;
  }) => {
    executeSearch(
      searchCategory,
      params.serverName || "",
      params.characterName || "",
      params.adventureName || ""
    );
  };

  return (
    <div className="App">
      <Title />
      <Category
        selectedCategory={searchCategory}
        onCategoryChange={setSearchCategory}
      />
      <Refresh
        selectedCategory={searchCategory}
        onRefresh={refresh}
      />
      <SearchBar
        category={searchCategory}
        onSearch={handelSearch}
        loading={loading}
      />
      {loading && <div>로딩 중...</div>}
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {searchCategory === "character" &&
        !loading &&
        characterCards &&
        characterCards.length > 0 && (
          <CharacterCard character={characterCards[0]} />
        )}
      {searchCategory === "adventure" &&
        !loading &&
        adventureClearCount && (
          <AdventureResult adventureData={adventureClearCount} />       )}
      {searchCategory === "adventure" &&
        !loading &&
        characterCards &&
        characterCards.map((char, index) => (
          <CharacterCard key={index} character={char} />
        ))}
      <Footer />
    </div>
  );
}
