import Cart from './components/Cart.jsx';
import Header from './components/Header.jsx';
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>        
    //  <h1>You got this 💪</h1>
    //   <p>Stuck? Not sure how to proceed?</p>
    //   <p>Don't worry - we've all been there. Let's build it together!</p> 
  );
}

export default App;
