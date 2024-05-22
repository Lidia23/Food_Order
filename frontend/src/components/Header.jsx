import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){
    const {items} = useContext(CartContext);
    const {showCart} = useContext(UserProgressContext);

    function handleShowCart(){
        showCart();
    }
    return(
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt='A restaurant'/>
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({items.reduce((totalNoOfItems, items)=>{return totalNoOfItems + items.quantity},0)})</Button>
        </nav>
    </header>
    );
}