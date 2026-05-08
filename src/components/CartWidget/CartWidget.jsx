import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
    const { cart } = useContext(CartContext);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="cart-widget">
            <span className="cart-icon">🛒</span>
            
            {totalQuantity > 0 && (
                <span className="cart-badge">
                    {totalQuantity}
                </span>
            )}
        </div>
    );
};

export default CartWidget;