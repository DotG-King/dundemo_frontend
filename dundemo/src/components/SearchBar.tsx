import React, { useState } from "react";

export default function SearchBar({
  category,
  onSearch,
  loading,
}: SearchBarProps) {
  const [serverName, setServerName] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [adventureName, setAdventureName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (category === "character") {
      onSearch({ serverName, characterName });
    } else {
      onSearch({ adventureName });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="character-form">
        {category === "adventure" ? (
          <>
            <div className="form-group">
              <label htmlFor="adventureName">모험단명 : </label>
              <input
                type="text"
                id="adventureName"
                value={adventureName}
                onChange={(e) => setAdventureName(e.target.value)}
                placeholder="모험단명을 입력하세요"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "조회 중..." : "조회"}
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="serverName">서버 : </label>
              <select
                id="serverName"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                required
              >
                <option value="">서버 선택</option>
                <option value="anton">안톤</option>
                <option value="bakal">바칼</option>
                <option value="cain">카인</option>
                <option value="casillas">카시야스</option>
                <option value="diregie">디레지에</option>
                <option value="hilder">힐더</option>
                <option value="prey">프레이</option>
                <option value="siroco">시로코</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="characterName">캐릭터명 : </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="캐릭터명을 입력하세요"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "조회 중..." : "조회"}
            </button>
          </>
        )}
      </form>
    </>
  );
}
