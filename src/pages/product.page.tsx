import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Product, CartProduct } from "../library/types";
import { IMAGES_PATH } from "../constants/client.constants";
import { detailsProduct } from "../redux/actions/product.actions";
import { addToCart, removeFromCart } from "../redux/actions/cart.actions";

import ProductQuantity from "../components/product-quantity.component";
import ProductsPageBacklink from "../components/products-page-backlink.component";

function ProductPage(props: any){

	const productId = props.match.params.id;
	const productDetails = useSelector((state: any) => state.productDetails);
	const cartDetails = useSelector((state: any) => state.cartDetails);
	const { product, loading, error } = productDetails;
	const cartProducts = cartDetails.cartProducts;
	const dispatch = useDispatch();
	const [ productQuantity, setProductQuantity ] = useState(1);

	useEffect(() => {
		dispatch(detailsProduct(productId));
    	return () => {};
	}, []);

	return (
		<div className="product">
			<ProductsPageBacklink/>
			{
				loading ? <div>Loading...</div> :
				error ? <div>{error.message}</div> :
				(
					<div className="content">
						<div className="image">
							<section>
								<img src={ IMAGES_PATH+product.image } />
							</section>
						</div>
						<div className="details">
							<section>
								<article>
									<ul>
										<li>
											<h4> { product.name } </h4>
											<p className="brand" > - { product.brand } </p>
										</li>
										<li>
											<p className="rating">
												{ product.rating } Stars ({ product.noOfReviews } Reviews) 
											</p>
										</li>
										<li>
											<p> Description: </p>
											<h6>{ product.description } </h6>
										</li>							
									</ul>
								</article>
							</section>
						</div>
						<div className="actions">
							<ul>
								<li>
									<p> Price: <span className="price"> ${ product.price } </span> </p>
								</li>
								<li>
									<p> Status: { 
										product.stock > 0 ? "In Stock" : "Unavailable"
									} </p>
								</li>
								<li>{
									product.stock > 0 &&
									<p> Quantity: 
										<ProductQuantity 
											productQuantity={productQuantity}
											setProductQuantity={
												(value: string) => {
													setProductQuantity(parseInt(value))
													dispatch(
														removeFromCart(
																product._id
														)
													)
												}
											}
											productStock={product.stock}
										/>
									</p>
								}
								</li>
								<li>
									{
										(cartProducts.findIndex(
											(cartProduct: CartProduct) => 
											cartProduct._id === product._id)
										=== -1) ?
										product.stock > 0 &&
										<button 
											onClick={
												() => 
												dispatch(
													addToCart(
														product,
														productQuantity
													)
												)
											} 
											className="add-to-cart-button primary">
											Add to cart
										</button> :
										<button 
											onClick={
												() => 
												dispatch(
													addToCart(
														product,
														productQuantity
													)
												)
											} 
											className="add-to-cart-button primary">
											Proceed to checkout
										</button>
									}
								</li>
							</ul>
						</div>
					</div>
				)
			}
		</div>
	);
}

export default ProductPage;