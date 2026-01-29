export default function AdventureResult({ adventureData }: { adventureData: adventureClearCount | null }) {
    if (!adventureData) {
        return null;
    }

    return (
        <div className="adventure-result">
            <h2 className="adventure-name">{adventureData.adventureName} 클리어 기록</h2>
            <div className="clear-counts">
                <p>나벨 클리어: {adventureData.nabelClearCount}회</p>
                <p>황혼 클리어: {adventureData.inaeClearCount}회</p>
                <p>디레지에 클리어: {adventureData.diregieClearCount}회</p>
            </div>
        </div>
    );
}