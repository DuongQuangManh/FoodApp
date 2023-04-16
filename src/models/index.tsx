export interface ProductModel {
    _id: string,
    name: string,
    img: string,
    id_theloai: string,
    price: number,
    description: string
}

export interface UserModel {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    passwd: string,
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

export interface OrderModel {
    _id: string,
    id_user: string,
    id_product: string,
    quantity: number,
    createdAt?: string,
}