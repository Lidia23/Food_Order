import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFromatter } from "../util/formating";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from './UI/Input.jsx';

export default function CheckOut() {
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0)
    const userProgressCtx = useContext(UserProgressContext);

    function handleHideCheckOut(){
        userProgressCtx.hideCheckOut();
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleHideCheckOut}>
            <form>
                <h2>Chekout</h2>
                <p>Total Amount: {currencyFromatter.format(cartTotal)}</p>
                <Input type='text' label="Full Name" id="full-name" />
                <Input type='email' label="Email" id="email" />
                <Input type='text' label="Street" id="street" />
                <div className="control-row">
                    <Input type='text' label="Postal Code" id="postal-code" />
                    <Input type='text' label="City" id="city" />
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleHideCheckOut}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}