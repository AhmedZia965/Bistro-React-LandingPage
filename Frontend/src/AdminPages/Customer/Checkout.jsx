
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCustomerAddressesAxiosFunction } from "../../Services/CustomerApi";
import "./Checkout.css";

// Checkout form validation rules
const checkoutSchema = z.object({
    fullName: z.string()
        .trim()
        .min(1, "Full name is required.")
        .max(100, "Full name cannot exceed 100 characters."),

    phone: z.string()
        .trim()
        .min(1, "Phone number is required.")
        .regex(/^\+?\d{8,12}$/, "Enter 8–12 digits, optionally starting with +."),

    notes: z.string()
        .max(500, "Order notes cannot exceed 500 characters.")
});

function Checkout() {
    const navigate = useNavigate();

    // Get cart items
    const [cartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cartItems") || "[]");
    });

    // Store delivery or pickup option
    const [orderType, setOrderType] = useState("Delivery");

    // Store saved addresses
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");

    // Store loading and error information
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const [addressError, setAddressError] = useState("");

    // Get customer ID
    const customerId = sessionStorage.getItem("customerId");

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            notes: ""
        }
    });

    // Check login and get saved addresses
    useEffect(() => {
        if (
            sessionStorage.getItem("isLoggedIn") !== "true" ||
            !customerId
        ) {
            navigate("/login");
            setLoadingAddresses(false);
            return;
        }

        async function getSavedAddresses() {
            try {
                setLoadingAddresses(true);
                setAddressError("");

                // Get addresses for the logged-in customer
                const response =
                    await getCustomerAddressesAxiosFunction(customerId);

                // Check the actual response from the backend
                console.log("Addresses API response:", response.data);

                // Support common response formats
                const data = response.data;

                const addresses = Array.isArray(data)
                    ? data
                    : Array.isArray(data.addresses)
                    ? data.addresses
                    : Array.isArray(data.customer?.addresses)
                    ? data.customer.addresses
                    : Array.isArray(data.data?.addresses)
                    ? data.data.addresses
                    : [];

                console.log("Saved addresses:", addresses);

                setSavedAddresses(addresses);

                if (addresses.length > 0) {
                    const firstAddressId =
                        addresses[0]._id || addresses[0].id;

                    setSelectedAddress(firstAddressId || "");
                } else {
                    setSelectedAddress("");
                }
            } catch (error) {
                console.error(
                    "Error getting saved addresses:",
                    error.response?.data || error.message
                );

                setAddressError(
                    error.response?.data?.message ||
                    "Unable to load your saved addresses."
                );
            } finally {
                setLoadingAddresses(false);
            }
        }

        getSavedAddresses();
    }, [navigate, customerId]);

    // Calculate order subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );

    // Delivery fee only applies to delivery
    const deliveryFee =
        orderType === "Delivery" && subtotal > 0 ? 1.500 : 0;

    const total = subtotal + deliveryFee;

    // Format prices in KWD
    function formatPrice(price) {
        return `KWD ${Number(price).toFixed(3)}`;
    }

    // Get address ID
    function getAddressId(address) {
        return address._id || address.id;
    }

    // Display saved address
    function getAddressText(address) {
        const addressLine =
            address.address ||
            address.fullAddress ||
            address.addressLine ||
            address.street ||
            "";

        const city = address.city || "";

        const addressText = [
            address.label,
            addressLine,
            city
        ].filter(Boolean).join(", ");

        return addressText || "Saved address";
    }

    // Handle valid checkout form submission
    function handleCheckout(data) {
        if (
            sessionStorage.getItem("isLoggedIn") !== "true" ||
            !customerId
        ) {
            navigate("/login");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            navigate("/menu");
            return;
        }

        if (orderType === "Delivery") {
            if (savedAddresses.length === 0) {
                alert(
                    "Please add a saved address to your profile before ordering delivery."
                );
                return;
            }

            if (!selectedAddress) {
                alert("Please select a delivery address.");
                return;
            }
        }

        // Validated form values
        console.log("Customer Details:", data);
        console.log("Order Type:", orderType);
        console.log("Selected Address:", selectedAddress);
        console.log("Cart Items:", cartItems);
        console.log("Order Total:", total);

        // Order placement will be connected to the backend next
        alert(
            "Your details are ready. Order placement will be connected next."
        );
    }

    return (
        <div className="checkout-page">
            <div className="container py-5">

                {/* Page Heading */}
                <div className="checkout-heading mb-5">
                    <p className="checkout-eyebrow">ALMOST THERE</p>
                    <h1>Checkout<span>.</span></h1>
                    <p>Complete your details for a delicious order.</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="checkout-empty">
                        <i className="bi bi-bag"></i>
                        <h3>Your cart is empty</h3>
                        <p>Add some items to your cart before checking out.</p>

                        <Link
                            to="/menu"
                            className="btn checkout-primary-btn"
                        >
                            Explore Menu
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(handleCheckout)}>
                        <div className="row g-4">

                            {/* Customer Details */}
                            <div className="col-lg-7">
                                <div className="checkout-form-panel">

                                    <h4>Order Type</h4>
                                    <p className="checkout-description">
                                        Choose delivery or collect your order yourself.
                                    </p>

                                    <div className="row g-3 mb-4">

                                        <div className="col-md-6">
                                            <button
                                                type="button"
                                                className={`checkout-option ${
                                                    orderType === "Delivery"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setOrderType("Delivery")
                                                }
                                            >
                                                <i className="bi bi-truck"></i>
                                                <span>Delivery</span>
                                                <small>
                                                    Delivered to your saved address
                                                </small>
                                            </button>
                                        </div>

                                        <div className="col-md-6">
                                            <button
                                                type="button"
                                                className={`checkout-option ${
                                                    orderType === "Pickup"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setOrderType("Pickup")
                                                }
                                            >
                                                <i className="bi bi-shop"></i>
                                                <span>Pickup</span>
                                                <small>
                                                    Collect your order from the bistro
                                                </small>
                                            </button>
                                        </div>

                                    </div>

                                    {/* Saved Delivery Addresses */}
                                    {orderType === "Delivery" && (
                                        <div className="mb-4">
                                            <label
                                                htmlFor="savedAddress"
                                                className="form-label"
                                            >
                                                Select Saved Address
                                            </label>

                                            {loadingAddresses ? (
                                                <p>
                                                    Loading your saved addresses...
                                                </p>
                                            ) : addressError ? (
                                                <p className="text-danger">
                                                    {addressError}
                                                </p>
                                            ) : savedAddresses.length === 0 ? (
                                                <div className="checkout-address-message">
                                                    <p>
                                                        You have no saved addresses.
                                                        Add an address in your customer
                                                        profile before choosing delivery.
                                                    </p>
                                                </div>
                                            ) : (
                                                <select
                                                    className="form-select"
                                                    id="savedAddress"
                                                    value={selectedAddress}
                                                    onChange={(event) =>
                                                        setSelectedAddress(
                                                            event.target.value
                                                        )
                                                    }
                                                    required
                                                >
                                                    <option value="">
                                                        Choose a saved address
                                                    </option>

                                                    {savedAddresses.map((address) => (
                                                        <option
                                                            key={getAddressId(address)}
                                                            value={getAddressId(address)}
                                                        >
                                                            {getAddressText(address)}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    )}

                                    {/* Contact Details */}
                                    <h4>Contact Details</h4>
                                    <p className="checkout-description">
                                        Enter your contact information for this order.
                                    </p>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="fullName"
                                            className="form-label"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.fullName ? "is-invalid" : ""
                                            }`}
                                            id="fullName"
                                            {...register("fullName")}
                                        />

                                        {errors.fullName && (
                                            <p className="text-danger mt-1">
                                                {errors.fullName.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="phone"
                                            className="form-label"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            className={`form-control ${
                                                errors.phone ? "is-invalid" : ""
                                            }`}
                                            id="phone"
                                            {...register("phone")}
                                        />

                                        {errors.phone && (
                                            <p className="text-danger mt-1">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="notes"
                                            className="form-label"
                                        >
                                            Order Notes (Optional)
                                        </label>

                                        <textarea
                                            className={`form-control ${
                                                errors.notes ? "is-invalid" : ""
                                            }`}
                                            id="notes"
                                            rows="2"
                                            placeholder="Any special instructions?"
                                            {...register("notes")}
                                        ></textarea>

                                        {errors.notes && (
                                            <p className="text-danger mt-1">
                                                {errors.notes.message}
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="col-lg-5">
                                <div className="checkout-summary">

                                    <p className="checkout-eyebrow">
                                        YOUR SELECTION
                                    </p>

                                    <h4>Order Summary</h4>

                                    {cartItems.map((item) => (
                                        <div
                                            className="checkout-item"
                                            key={item._id || item.id}
                                        >
                                            <div>
                                                <h6>{item.name}</h6>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>

                                            <strong>
                                                {formatPrice(
                                                    Number(item.price) *
                                                    Number(item.quantity)
                                                )}
                                            </strong>
                                        </div>
                                    ))}

                                    <div className="checkout-summary-line">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>

                                    <div className="checkout-summary-line">
                                        <span>
                                            Delivery Fee
                                            {orderType === "Pickup" && " (Pickup)"}
                                        </span>
                                        <span>{formatPrice(deliveryFee)}</span>
                                    </div>

                                    <div className="checkout-summary-divider"></div>

                                    <div className="checkout-total">
                                        <span>Total</span>
                                        <strong>{formatPrice(total)}</strong>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn checkout-primary-btn w-100"
                                        disabled={
                                            orderType === "Delivery" &&
                                            (
                                                loadingAddresses ||
                                                savedAddresses.length === 0 ||
                                                !selectedAddress
                                            )
                                        }
                                    >
                                        Place Order
                                        <i className="bi bi-arrow-right"></i>
                                    </button>

                                    <Link
                                        to="/cart"
                                        className="checkout-back-link"
                                    >
                                        <i className="bi bi-arrow-left"></i>
                                        Back to Cart
                                    </Link>

                                    <div className="cart-security">
                                        <i className="bi bi-shield-check"></i>
                                        <span>
                                            Freshly prepared. Carefully delivered.
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </form>
                )}

            </div>
        </div>
    );
}

export default Checkout;
