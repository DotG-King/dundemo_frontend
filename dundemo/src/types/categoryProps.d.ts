interface CategoryProps {
    selectedCategory: 'adventure' | 'character';
    onCategoryChange: (category: 'adventure' | 'character') => void;
}