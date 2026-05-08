import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, removeItem } = useContext(CartContext);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <div className="empty-cart-container">
                <h2>Tu inventario está vacío</h2>
                <p>Parece que aún no has elegido tu arma sonora.</p>
                <Link to='/' className="btn-back-to-catalog">
                    Explorar instrumentos
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            <h1 className="cart-title">Tu Selección</h1>
            
            <div className="cart-list">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <div className="cart-item-details">
                                <span>Cantidad: {item.quantity}</span>
                                <span className="cart-subtotal">Subtotal: ${item.price * item.quantity}</span>
                            </div>
                        </div>
                        <button 
                            className="btn-remove-item"
                            onClick={() => removeItem(item.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total-box">
                    <span>Total de la Orden:</span>
                    <span className="total-amount">${total}</span>
                </div>
                
                <div className="cart-actions">
                    <button className="btn-clear-cart" onClick={() => clearCart()}>
                        Vaciar Carrito
                    </button>
                    <Link to='/checkout' className="btn-checkout">
                        Proceder al Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;