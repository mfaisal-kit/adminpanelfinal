export const userSchema = {
    name:"user_name",
    title:"user Title",
    type:"document",
    fields:[
        {
            name:"name",
            title:"user name",
            type:"string"
        },
        {
            name:"description",
            title:"user description",
            type:"string"
        },
        {
            name:"thumbnail",
            title:"user thumbnail",
            type:"image"
        },
    ]
}