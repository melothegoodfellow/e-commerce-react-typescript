import React from "react";

function ProductQuantity({ productQuantity, setProductQuantity, productStock }: 
	{ productQuantity: number, setProductQuantity: Function, productStock: number}){
	return (
		<select 
			value={productQuantity} 
			onChange={
				(event: any) => {
					setProductQuantity(event.target.value);
				}
			}>
			{
				[...Array(productStock).keys()].map(
					(index) => <option key={ index+1 } value={index + 1}> { index + 1 } </option>
				)
			}
		</select>
	)
}

export default ProductQuantity;