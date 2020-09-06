import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CartProduct } from "../lib/types";

//constants
import { IMAGES_PATH } from "../constants/client.constants";

//redux
import { removeFromCart, addToCart } from "../redux/actions/cart.actions";

//components
import ProductQuantity from "../components/product-quantity.component";
import ProductsPageBacklink from "../components/products-page-backlink.component";

function CartPage(props: any){
  	const productList = useSelector((state: any) => state.cartDetails);
  	const { products } = productList.products || [];
  	const cartDetails = useSelector((state: any) => state.cartDetails);
  	const { cartProducts, loading, error } = cartDetails;
	const dispatch = useDispatch();

	return (
		<div className="cart">
			<ProductsPageBacklink/>
			{
				loading ? <div> Loading... </div> :
				error ? <div>{error.message}</div> :
				(
					<div className="content">
						<div className="list">
							<h3>
								Shopping Cart
							</h3>
							<ul className="products">
								<li className="title">

									<div className="container">
										<span>
											Product Details
										</span>
										<span>
											Quantity
										</span>
										<span>
											Price
										</span>
										<span>
											Subtotal
										</span>
										<span>
											
										</span>
									</div>
								</li>
								{
									cartProducts.length === 0 ? 
									<li className="empty">
										<span>
											Cart is empty!
										</span>
									</li> 
									:
									cartProducts.map(
										(cartProduct: any, cartProductIndex: number) => 
										<li className="product">
											<div className="details">
												<img 
													className="image" 
													src={IMAGES_PATH+cartProduct.image} 
													alt="product" />
												<div className="name">
													<div className="name">
														{ cartProduct.name }
													</div>
												</div>
											</div>
											<div className="quantity">
												<ProductQuantity 
													productQuantity={cartProduct.quantity}
													setProductQuantity={
														(value: string) => 
															dispatch(addToCart(
																cartProduct,
																parseInt(value)
															)
														)
													}
													productStock={cartProduct.stock}
												/>
											</div>
											<div>
												<span className="price">
												 	${ cartProduct.price }
												</span>
											</div>
											<div>
												<span className="subtotal">
												 	${ cartProduct.price * cartProduct.quantity }
												</span>
											</div>
											<div>
												<button 
													onClick={() => 
														dispatch(removeFromCart(cartProduct._id))
													}>
													Delete
												</button>
											</div>
										</li>									
									)
								}
							</ul>
						</div>
						<div className="action">
							<div className="container">
								<h3>
									Total ({ 
										cartProducts.reduce(
											(accumulator: number, cartProduct: CartProduct) => 
											accumulator + cartProduct.quantity
										, 0) 
									} items) : ${
										cartProducts.reduce(
											(accumulator: number, cartProduct: CartProduct) => 
											accumulator + (cartProduct.price * cartProduct.quantity)
										, 0)
									}
								</h3>
								<button 
									className="proceed-to-checkout-button primary" 
									disabled={cartProducts.length === 0}
									>
									Proceed to checkout
								</button>
							</div>
						</div>
					</div>
				)
			}
		</div>
	);
}

export default CartPage;