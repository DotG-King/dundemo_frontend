import "../css/CharacterCard.css";

export default function CharacterCard({ character }: { character: CharacterCardProps | null }) {
  // character 데이터가 없을 경우 렌더링 하지 않음
  if (!character) {
    return null;
  }

  return (
    <div className="character-card">
      <img
        src={`data:image/png;base64,${character.image}`}
        alt={character.characterName}
        className="character-image"
      />
      <div className="character-info">
        <h3 className="character-name">{character.characterName}</h3>
        <p className="server-adventure">
          {character.serverName} | {character.adventureName}
        </p>
        <p className="fame">명성: {character.fame.toLocaleString()}</p>
        <div className="raid-counts">
          <p>나벨 클리어: {character.nabelClearCount}회</p>
          <p>황혼 클리어: {character.inaeClearCount}회</p>
          <p>디레지에 클리어: {character.diregieClearCount}회</p>
        </div>
      </div>
    </div>
  );
}
