import "./styles.css";
import { useState, useRef, useEffect } from "react";
import { useCart } from "./cart-context";
import Wishlist from "./Wishlist";

function ShowItem({ item, removeItem }) {
  const { id, name, price, count } = item;
  return (
    <div
      key={id}
      style={{ border: "solid black 1px", padding: "1rem", margin: "1rem" }}
    >
      <h2>{name}</h2>
      <p> Rs. {price}</p>
      <p>count: {count}</p>
      <button>+</button>
      <button>-</button>
      <button
        className="remove-items"
        onClick={() => {
          removeItem(id);
        }}
      >
        X
      </button>
      {/* <button
            onClick={() => setItemsInCart((items) => [...items, { items }])}
          >
            Add to Cart
          </button> */}
    </div>
  );
}
// Route
export function CheckOut() {
  const [creditInput, setCreditInput] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { items, setItems, setInitialItems } = useCart();
  // let splitByInterval = (str, n) =>
  //   str.match(new RegExp(".{1," + n + "}", "g")).join(" ");
  // const handleCreditValueChange = ({ target }) => {
  //   setCreditInput(splitByInterval(target.value, 4));
  // };
  return (
    <div>
      <br />
      <label>Credit Card Number: </label>
      <input
        ref={inputRef}
        type="text"
        value={creditInput}
        onChange={(e) => setCreditInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (
            creditInput.trim().length === 16 &&
            items.some((el) => el.count > 0)
          ) {
            alert("Thanks for buying from our shop");
            setCreditInput("");
            setInitialItems();
            return;
          }
          alert("Please enter the credit card number");
        }}
      >
        Done
      </button>
    </div>
  );
}
// Route
export function ProductListing() {
  const { items, setItems } = useCart();
  return items.map((item) => (
    <div
      style={{ border: "solid black 1px", padding: "1rem", margin: "1rem" }}
      key={item.id}
    >
      <h2>{item.name}</h2>
      <p>{item.price}</p>
      {!item.count ? (
        <button
          onClick={() => {
            let temp = items.map((el) =>
              el.id === item.id ? { ...el, count: el.count + 1 } : el
            );
            console.log(temp);
            setItems(temp);
          }}
        >
          Add to Cart
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              let temp = items.map((el) =>
                el.id === item.id ? { ...el, count: el.count + 1 } : el
              );
              setItems(temp);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              let temp = items.map((el) =>
                el.id === item.id ? { ...el, count: el.count - 1 } : el
              );
              setItems(temp);
            }}
          >
            -
          </button>
        </>
      )}
    </div>
  ));
}
// Route
export function Cart() {
  // const { items, setItems } = useContext(CartContext);
  const { items, setItems } = useCart();
  const removeItem = (id) => {
    let temp = items.map((el) => (el.id === id ? { ...el, count: 0 } : el));
    setItems(temp);
  };
  let length = items.reduce(function (n, val) {
    return n + (val.count > 0);
  }, 0);
  return (
    <div>
      <h1> Items in cart {length} </h1>
      <ul>
        {items.map((item) => {
          if (item.count) {
            return <ShowItem item={item} removeItem={removeItem} />;
          } else {
            return undefined;
          }
        })}
      </ul>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState("products");

  return (
    <div className="App">
      <h1 className="app-header">eCommerce</h1>
      <button onClick={() => setRoute("products")}>Product</button>
      <button onClick={() => setRoute("cart")}>Cart</button>
      <button onClick={() => setRoute("checkout")}>Checkout</button>
      <button onClick={() => setRoute("wishlist")}>Wishlist</button>
      <div className="app-body">
        {route === "checkout" && <CheckOut />}
        {route === "cart" && <Cart />}
        {route === "products" && <ProductListing />}
        {route === "wishlist" && <Wishlist setRoute={setRoute} />}
      </div>
    </div>
  );
}
// !items.some((el) => el.id === product.id)
