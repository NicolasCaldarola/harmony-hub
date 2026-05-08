import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/config';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true); 

        const collectionRef = categoryId 
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products');

        getDocs(collectionRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch(error => {
                console.error("Error buscando productos: ", error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [categoryId]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="fantasy-loader">
                    <h2>Invocando instrumentos...</h2>
                    <div className="loader-bar"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="main-greeting">{greeting}</h1>             
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;