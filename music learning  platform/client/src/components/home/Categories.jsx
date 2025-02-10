import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../../constants/data';
import './Categories.css'; // Import the CSS file

const Categories = () => {
    const [searchParams] = useSearchParams();
    const categoryFromParams = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState(categoryFromParams || '');

    const handleCategoryClick = (categoryType) => {
        setSelectedCategory(categoryType);
    };

    return (
        <div className="categories-container">
            {/* Create Blog Button */}
            <Link to={`/create?category=${selectedCategory}`} className="create-blog-button">
                Create Blog
            </Link>

            {/* Categories Table */}
            <table className="categories-table">
                <thead>
                    <tr>
                        <th>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                All Categories
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td
                                onClick={() => handleCategoryClick(category.type)}
                                className={selectedCategory === category.type ? 'highlighted-text' : ''}
                            >
                                <Link to={`/?category=${category.type}`} style={{ textDecoration: 'none', color: ' #cb7a24' }}>
                                    {category.type}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;