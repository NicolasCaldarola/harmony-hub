import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { db } from '../../services/firebase/config';
import { getDoc, doc } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);
        const docRef = doc(db, 'products', itemId);

        getDoc(docRef)
            .then(response => {
                const data = response.data();
                const productAdapted = { id: response.id, ...data };
                setProduct(productAdapted);
            })
            .catch(error => {
                console.error("Error al obtener el detalle:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="fantasy-loader">
                    <h2>Cargando detalles del instrumento...</h2>
                    <div className="loader-bar"></div>
                </div>
            </div>
        );
    }

    return (
        <main className="container">
            {product && <ItemDetail {...product} />}
        </main>
    );
};

export default ItemDetailContainer;