import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFromatter } from "../util/formating";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from './UI/Input.jsx';
import useHttp from "./hooks/usehttp.js";
import Error from "./Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function CheckOut() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest
    } = useHttp('http://localhost:3000/orders', requestConfig);    
    
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)

    function handleHideCheckOut() {
        userProgressCtx.hideCheckOut();
    }
    function handleSubmit(e) {
        e.preventDefault(); //to not just sent the request to the frontend and not to the backend
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());
        
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
        
    }
    let actions = (
        <>
            <Button type="button" textOnly onClick={handleHideCheckOut}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )
    if(isSending){
        actions=<span>Sending order data...</span>
    }
    if(data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleHideCheckOut}>
            <h2>Success</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleHideCheckOut}>Okay</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleHideCheckOut}>
            <form onSubmit={handleSubmit}>
                <h2>Chekout</h2>
                <p>Total Amount: {currencyFromatter.format(cartTotal)}</p>
                <Input type='text' label="Full Name" id="name" />
                <Input type='email' label="Email" id="email" />
                <Input type='text' label="Street" id="street" />
                <div className="control-row">
                    <Input type='text' label="Postal Code" id="postal-code" />
                    <Input type='text' label="City" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error}/>}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    )
}