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
}

export interface CategoryModel {
    _id: string,
    name: string,
}