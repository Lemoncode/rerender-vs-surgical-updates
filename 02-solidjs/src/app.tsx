import { createSignal } from "solid-js";
import { For } from "solid-js/web";
import { Product, AddProduct, FancyFilter } from "@/components";
import { useColor } from "@/hooks";
import { getUpdated, getFiltered } from "@/helpers";
import { INITIAL_PRODUCTS } from "./constants";
import classes from "./app.module.css";

const ProductList = (props) => {
  const [products, setProducts] = createSignal(INITIAL_PRODUCTS);
  const handleChange = (id) => {
    setProducts((products) => getUpdated(id, products));
  };
  const filtered = () => getFiltered(products(), props.visibility);

  return (
    <>
      <ul>
        <For each={filtered()}>
          {(product) => <Product product={product} onChange={handleChange} />}
        </For>
      </ul>
      <AddProduct onAdd={setProducts} />
    </>
  );
};

export const App = () => {
  const { color, onColorChange } = useColor();
  const [visibility, setVisibility] = createSignal("all");
  return (
    <div class={classes.root}>
      <FancyFilter
        color={color()}
        onColorChange={onColorChange}
        visibility={visibility()}
        onVisibilityChange={setVisibility}
      />
      <ProductList visibility={visibility()} />
    </div>
  );
};
