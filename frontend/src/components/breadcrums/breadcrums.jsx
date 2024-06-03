import "./breadcrums.css";
import ProductDisplay from "../productdisplay/productdisplay.jsx";

function BreadCums(props) {
  const product = props.product[0];
  // console.log(props)
  return (
    <div>
      <ProductDisplay product={product}></ProductDisplay>
    </div>
  );
}

export default BreadCums;
