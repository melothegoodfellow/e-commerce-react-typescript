import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IMAGES_PATH } from "../constants/client.constants";
import { Product } from "../lib/types";
import { listProducts } from "../redux/actions/product.actions";

// import data from "../mocks/data.json";

function HomePage(){

  const productList = useSelector((state: any) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);

	return (
    loading ? <div> Loading... </div> :
      error ? <div> {error} </div> :
    		<div className="home">
          <ul className="products">
            {
              products.map((product: Product, index: number) => 
                <li className="product" key={product._id}>
                  <section>
                    <Link to={"/products/"+product._id}>
                        <img 
                          className="image" 
                          src={`${IMAGES_PATH}${product.image}`} 
                          alt="product"  />
                    </Link>
                    <h1 className="name">
                      <Link to={"/products/"+product._id}>
                        {product.name}
                      </Link>
                    </h1>
                    <p className="brand">
                      By { product.brand }
                    </p>
                    <p className="price">
                      ${product.price}
                    </p>
                    <p className="rating">
                      {product.rating} stars ({product.noOfReviews} reviews)
                    </p>
                  </section>
                </li>
              )
            }
          </ul>
        </div>
	);
}

export default HomePage;