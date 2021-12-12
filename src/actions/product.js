export const getListProduct = () =>{
    return {
        type : "GET_LIST_PRODUCT"
    }
}

export const deleteProduct = (id) =>{
    return {
        type : "DELETE_PRODUCT",
        id
    }
}