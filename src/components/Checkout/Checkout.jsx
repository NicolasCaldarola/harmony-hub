import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../services/firebase/config';
import { collection, addDoc, serverTimestamp, writeBatch, getDoc, doc } from 'firebase/firestore';

const Checkout = () => {
    const [orderId, setOrderId] = useState('');
    const [buyer, setBuyer] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const { cart, total, clearCart } = useContext(CartContext);

    const handleInputChange = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        });
    };

    const createOrder = async (e) => {
        e.preventDefault();
        const batch = writeBatch(db);
        const outOfStock = [];

        try {
            for (const item of cart) {
                const productRef = doc(db, 'products', item.id);
                const productSnap = await getDoc(productRef);
                const stockDb = productSnap.data().stock;

                if (stockDb >= item.quantity) {
                    batch.update(productRef, { stock: stockDb - item.quantity });
                } else {
                    outOfStock.push({ id: productSnap.id, ...productSnap.data() });
                }
            }

            if (outOfStock.length === 0) {
                const objOrder = {
                    buyer: buyer,
                    items: cart,
                    total: total,
                    date: serverTimestamp()
                };

                const ordersRef = collection(db, 'orders');
                const orderAdded = await addDoc(ordersRef, objOrder);
                
                await batch.commit(); 
                
                setOrderId(orderAdded.id);
                clearCart();
            } else {
                alert("Lo sentimos, algunos productos ya no tienen stock suficiente.");
            }

        } catch (error) {
            console.error("Error al procesar la orden:", error);
        }
    };

    if (orderId) {
        return (
            <div className="success-container">
                <h1>¡Gracias por tu compra!</h1>
                <p>Tu código de seguimiento es:</p>
                <strong className="order-number">{orderId}</strong>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Finalizar Compra</h2>
            <form onSubmit={createOrder} className="checkout-form">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Nombre completo" 
                    onChange={handleInputChange} 
                    required 
                    className="checkout-input"
                />
                <input 
                    type="number" 
                    name="phone" 
                    placeholder="Teléfono" 
                    onChange={handleInputChange} 
                    required 
                    className="checkout-input"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="E-mail" 
                    onChange={handleInputChange} 
                    required 
                    className="checkout-input"
                />
                <button type="submit" className="btn-confirm">
                    CONFIRMAR PEDIDO
                </button>
            </form>
        </div>
    );
};

export default Checkout;