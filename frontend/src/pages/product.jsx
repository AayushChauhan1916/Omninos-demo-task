import { useContext } from "react";
import ShopContext from "../context/shopcontext";
import {useParams} from "react-router-dom";
import BreadCums from "../components/breadcrums/breadcrums";


function Product(){
    const {all_products} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_products.filter((el)=>{return el.id == productId})
    return (
        <div>
            <BreadCums product={product}></BreadCums>
        </div>
    )
}

export default Product;