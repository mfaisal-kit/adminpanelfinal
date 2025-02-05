'use client'; // This marks the component as client-side

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarMenu from '../../admincomponents/SidebarMenu'; // Assuming this exists
import client from '@/sanity/sanity.client'; // Adjust path to your sanity client

interface ProductData {
  name: string;
  title: string;
  slug: string;
  price: string;
  description: string;
  category: string;
  // Removed image, thumbnail, rating from here
}

export default function AddProduct() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    title: '',
    slug: '',
    price: '',
    description: '',
    category: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsAuthenticated(true); // User is authenticated
    } else {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [router]);

  // Handle text input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { name, title, slug, price, description, category } = productData;

      // Create the new product document
      const newProduct = {
        _type: 'products',
        name,
        title,
        slug,
        price,
        description,
        category,
      };

      console.log('newProduct', newProduct);

      // Create the product document in Sanity
      await client.create(newProduct);

      alert('Product added successfully!');
      // Reset form after successful submission
      setProductData({
        name: '',
        title: '',
        slug: '',
        price: '',
        description: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return (
    <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Content Area */}
        <main className="ml-[270px] max-lg:ml-0 max-lg:w-full p-6 bg-[#070b18] min-h-screen w-full">
          <h1 className="text-white text-3xl font-semibold">Product Page</h1>

          {/* Add Product Form */}
          <div className="p-4 mx-auto max-w-xl bg-white font-[sans-serif] mt-8">
            <h1 className="text-2xl text-gray-800 font-bold text-center">Add Product</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
                placeholder="Product Title"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              <input
                type="text"
                name="slug"
                value={productData.slug}
                onChange={handleChange}
                placeholder="Product Slug"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Product Price"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Product Description"
                rows={4}
                className="w-full px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm pt-3 outline-none transition-all"
              />
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="Product Category"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />

              <button
                type="submit"
                className="text-white bg-black hover:bg-gray-900 tracking-wide text-sm px-4 py-2.5 w-full outline-none"
              >
                Add Product
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
