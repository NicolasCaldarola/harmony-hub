import { useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        const item = { id, name, price };
        addItem(item, quantity);
    };

    const defaultImg = 'https://placehold.co/600x400/1a1a1a/8b7355?text=Instrumento';

    return (
        <article className="ItemDetail-container">
            <picture className="ItemDetail-img">
                <img 
                    src={img || defaultImg} 
                    alt={name} 
                    onError={(e) => e.target.src = defaultImg}
                />
            </picture>
            
            <section className="ItemDetail-info">
                <header>
                    <h2>{name}</h2>
                </header>
                <p className="category-tag">Categoría: {category}</p>
                <p className="description">{description}</p>
                <p className="detail-price">${price}</p>
                
                <footer className="detail-footer">
                    {
                        quantityAdded > 0 ? (
                            <Link to='/cart' className="btn-finish">
                                Terminar compra
                            </Link>
                        ) : (
                            stock > 0 ? (
                                <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                            ) : (
                                <div className="no-stock-message">
                                    SIN STOCK DISPONIBLE
                                </div>
                            )
                        )
                    }
                </footer>
            </section>
        </article>
    );
};

export default ItemDetail;