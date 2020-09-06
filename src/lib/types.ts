export interface Product {
	_id: string,
	name: string,
	image: string,
	brand: string,
	stock: number,
	price: string,
	rating: number,
	noOfReviews: number,
	description: string,
	status: string
}

export interface CartProduct {
	_id: string,
	name: string,
	image: string,
	quantity: number,
	stock: number,
	price: number,
	subtotal?: number
}

export interface Action<T> {
	type: string,
	payload?: T,
	error?: string
}

export interface State {
	products?: any[],
	cartProducts?: any[]
}