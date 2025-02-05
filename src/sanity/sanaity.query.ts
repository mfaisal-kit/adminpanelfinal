import { groq } from "next-sanity";
import sanityClient from "./sanity.client";


export async function GetMobileData() {
    return sanityClient.fetch(
        //groq`*[_type=="mobile_name"]{name,description, thumbnail}`
          groq`*[_type=="mobile_name"]{name,description,thumbnail}`
    )
}

export async function GetUserData() {
    return sanityClient.fetch(
        //groq`*[_type=="user_name"]{name}`
          groq`*[_type=="user_name"]{name,description,thumbnail}`
    )    
}

//Featured Products
export async function GetFeaturedProductsData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [0..3]`
    )    
}

//Leatest Products
export async function GetLeatestProductsData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [4..9]`
    )    
}

//Trending Products
export async function GetTrendingProductsData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [10..13]`
    )    
}

//Top Categories
export async function GetTopCategoriesData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [14..17]`
    )    
}

//Shop Grid
export async function GetShopGridData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [18..29]`
    )    
}

//Shop Left Sidebar
export async function GetShopLeftData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [30..41]`
    )    
}

//Shop List
export async function GetShopListData() {
    return sanityClient.fetch(
        groq`*[_type=="products"]  | order(_createdAt asc)
                {name, title, price, description,image,slug}
                [41..52]`
    )    
}

//Product Details data
export async function GetProductDetails(param:string) {
    console.log('GetProductDetails(param:any)=>',param);
    return sanityClient.fetch(
        groq`*[_type=="products" && slug=='${param}']  | order(_createdAt asc)
                {name, title, price, description,image,slug}`
    )    
}

//params.slug