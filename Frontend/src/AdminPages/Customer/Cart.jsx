
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    // Get saved cart items
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cartItems") || "[]");
    });

    // Save updated cart items
    function saveCart(updatedItems) {
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        setCartItems(updatedItems);
    }

    // Get the item ID
    function getItemId(item) {
        return item._id || item.id;
    }

    // Update item quantity
    function updateQuantity(id, change) {
        const updatedItems = cartItems
            .map((item) =>
                getItemId(item) === id
                    ? { ...item, quantity: item.quantity + change }
                    : item
            )
            .filter((item) => item.quantity > 0);

        saveCart(updatedItems);
    }

    // Remove an item
    function removeItem(id) {
        const updatedItems = cartItems.filter(
            (item) => getItemId(item) !== id
        );

        saveCart(updatedItems);
    }

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );

    // Calculate delivery fee and total in KWD
    const deliveryFee = subtotal > 0 ? 1.500 : 0;
    const total = subtotal + deliveryFee;

    // Count total quantities
    const totalItems = cartItems.reduce(
        (count, item) => count + item.quantity,
        0
    );

    // Format prices in KWD
    function formatPrice(price) {
        return `KWD ${Number(price).toFixed(3)}`;
    }

    // Proceed to checkout only if logged in
    function proceedToCheckout() {
        if (cartItems.length === 0) {
            return;
        }

        if (sessionStorage.getItem("isLoggedIn") === "true") {
            navigate("/checkout");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="cart-page">
            <div className="container py-5">

                <div className="cart-heading mb-5">
                    <p className="cart-eyebrow">YOUR SELECTION</p>
                    <h1>Your Cart<span>.</span></h1>
                    <p>Good food is worth looking forward to.</p>
                </div>

                <div className="row g-4">

                    {/* Cart Items */}
                    <div className="col-lg-8">
                        <div className="cart-items-panel">

                            <div className="cart-panel-heading">
                                <h4>Your Items</h4>
                                <span>{totalItems} items</span>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="empty-cart">

                                    <div className="empty-cart-icon">
                                        <i className="bi bi-bag"></i>
                                    </div>

                                    <h3>Your cart is empty</h3>

                                    <p>
                                        Discover something delicious from our menu.
                                    </p>

                                    <Link
                                        to="/menu"
                                        className="btn cart-primary-btn"
                                    >
                                        Explore Menu
                                    </Link>

                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div
                                        className="cart-item"
                                        key={getItemId(item)}
                                    >

                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                        )}

                                        <div className="cart-item-details">
                                            <h5>{item.name}</h5>
                                            <p>{item.description || ""}</p>

                                            <button
                                                type="button"
                                                className="cart-remove-btn"
                                                onClick={() =>
                                                    removeItem(getItemId(item))
                                                }
                                            >
                                                <i className="bi bi-trash3"></i>
                                                Remove
                                            </button>
                                        </div>

                                        <div className="cart-item-actions">
                                            <strong>
                                                {formatPrice(
                                                    Number(item.price) * item.quantity
                                                )}
                                            </strong>

                                            <div className="quantity-control">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            getItemId(item),
                                                            -1
                                                        )
                                                    }
                                                    aria-label="Decrease quantity"
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            getItemId(item),
                                                            1
                                                        )
                                                    }
                                                    aria-label="Increase quantity"
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                ))
                            )}

                            <Link
                                to="/menu"
                                className="continue-shopping"
                            >
                                <i className="bi bi-arrow-left"></i>
                                Continue Shopping
                            </Link>

                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="cart-summary">

                            <p className="cart-eyebrow">THE TOTAL</p>

                            <h4>Order Summary</h4>

                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className="summary-line">
                                <span>Delivery Fee</span>
                                <span>{formatPrice(deliveryFee)}</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-total">
                                <span>Total</span>
                                <strong>{formatPrice(total)}</strong>
                            </div>

                            <button
                                type="button"
                                className={`btn cart-primary-btn w-100 ${
                                    cartItems.length === 0 ? "disabled" : ""
                                }`}
                                disabled={cartItems.length === 0}
                                onClick={proceedToCheckout}
                            >
                                Proceed to Checkout
                                <i className="bi bi-arrow-right"></i>
                            </button>

                            <div className="cart-security">
                                <i className="bi bi-shield-check"></i>
                                <span>
                                    Freshly prepared. Carefully delivered.
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cart;
