import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

function ProductsPageBacklink(){
	return (
		<nav className="products-page-backlink">
			<Link to="/"> 
				<ArrowLeftOutlined /> 
				<span className="title">
					Back to products
				</span> 
			</Link>
		</nav>
	)
}

export default ProductsPageBacklink;