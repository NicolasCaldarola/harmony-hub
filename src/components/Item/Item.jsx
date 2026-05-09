import { Link } from 'react-router-dom';

const Item = ({ id, name, img, price }) => {
    const defaultImg = 'https://placehold.co/600x400/1a1a1a/8b7355?text=Instrumento';

    const getSafePath = (path) => {
        if (!path) return defaultImg;

        const cleanPath = path.startsWith('/') ? path.substring(1) : path;

        return `${window.location.origin}/${cleanPath}`;
    };

    return (
        <article className="ItemCard">
            <img 
                src={img.startsWith('/') ? img : `/${img}`} 
                alt={name} 
                onError={(e) => { 
                    e.target.src = defaultImg;
                    e.target.onerror = null; 
                }}
            />
            
            <div className="ItemCard-info">
                <h3>{name}</h3>           
                <p className="price">${price}</p>
                
                <Link to={`/item/${id}`} className="btn-detail">
                    Ver detalle
                </Link>
            </div>
        </article>
    );
};

export default Item;