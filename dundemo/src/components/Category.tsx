export default function Category({ selectedCategory, onCategoryChange }: CategoryProps) {
    return (
        <div className="category-selector">
            <button
                className={selectedCategory === 'character' ? 'active' : ''}
                onClick={() => onCategoryChange('character')}
            >
                캐릭터
            </button>
            <button
                className={selectedCategory === 'adventure' ? 'active' : ''}
                onClick={() => onCategoryChange('adventure')}
            >
                모험단
            </button>
        </div>
    )
}