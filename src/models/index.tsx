export interface ProductModel {
    _id: string,
    name: string,
    img: string,
    id_theloai: string,
    id_cuahang: string,
    price: number,
    description: string

}

export interface UserModel {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    passwd: string,
    phone: string,
    img: string,
    status: boolean,
    position: boolean,
    token: string,
}

export interface CategoryModel {
    _id: string,
    name: string,
}

export interface FavoriteModel {
    _id: string,
    id_user: string,
    id_product: string,
}

export interface CartModel {
    _id: string,
    id_user: string,
    id_product: string,
    quantity: number,
}

export interface OrderModel {
    _id: string,
    id_cart: string,
    sumpay: number,
    status: string,
    methodPay: string,
    createdAt?: string,
}


export interface AddRessModel {
    _id: string,
    details: string,
    longitude: number,
    latitude: string,
    id_user: string,
}
