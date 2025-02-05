export const productSchema = {
    name:"products",
    title:"Products Title",
    type:"document",
    fields:[
        {
            name:"id",
            title:"product id",
            type:"number"
        },
        {
            name:"name",
            title:"product name 1",
            type:"string"
        },
        {
            name:"title",
            title:"product title 1",
            type:"string"
        },
        {
            name:"slug",
            title:"product slug",
            type:"string"
        },
        {
            name:"price",
            title:"product price 1",
            type:"string"
        },
        {
            name:"description",
            title:"product description 1",
            type:"string"
        },
        {
            name:"category",
            title:"product category 1",
            type:"string"
        },
        {
            name:"image",
            title:"product image 1",
            type:"string"
        },
        {
            name:"thumbnail",
            title:"mobile thumbnail 3",
            type:"image"
        },
        {
            name:"rating",
            title:"mobile thumbnail 3",
            type:"image"
        },
    ]
}