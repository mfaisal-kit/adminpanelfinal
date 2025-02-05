'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Using Next.js navigation hooks
import SidebarMenu from '../../../admincomponents/SidebarMenu'; // Assuming this exists
import client from '@/sanity/sanity.client'; // Sanity client import

interface ProductData {
  name: string;
  title: string;
  slug: string;
  price: string;
  description: string;
  category: string;
}

export default function EditProduct() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    title: '',
    slug: '',
    price: '',
    description: '',
    category: '',
  });

  const [loading, setLoading] = useState(true); // Loading state for fetching product
  const [error, setError] = useState<string | null>(null); // Error handling
  const [formErrors, setFormErrors] = useState<Partial<ProductData>>({}); // For storing form validation errors
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const router = useRouter();
  const productId = window.location.pathname.split('/').pop(); // Extract product ID from URL

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsAuthenticated(true); // User is authenticated
    } else {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [router]);

  // Fetch the product data based on the product ID
  useEffect(() => {
    if (productId && isAuthenticated) {
      const fetchProductData = async () => {
        try {
          const query = `*[_type == "products" && _id == $productId][0]`;
          const product = await client.fetch(query, { productId });
          if (product) {
            setProductData({
              name: product.name,
              title: product.title,
              slug: product.slug,
              price: product.price,
              description: product.description,
              category: product.category,
            });
            setLoading(false);
          } else {
            setError('Product not found.');
          }
        }catch (err: unknown) {
          if (err instanceof Error) {
              setError(`Error fetching product data: ${err.message}`);
          } else {
              setError('An unknown error occurred while fetching product data.');
          }
      }
        
      };

      fetchProductData();
    }
  }, [productId, isAuthenticated]);

  // Handle text input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Validate form fields before submitting
  const validateForm = () => {
    const errors: Partial<ProductData> = {};
    if (!productData.name) errors.name = "Name is required";
    if (!productData.title) errors.title = "Title is required";
    if (!productData.slug) errors.slug = "Slug is required";
    if (!productData.price) errors.price = "Price is required";
    if (!productData.category) errors.category = "Category is required";
    return errors;
  };

  // Handle form submission to update the product
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Prepare updated product data
      const updatedProduct: any = {
        _id: productId,
        _type: 'products',
        name: productData.name,
        title: productData.title,
        slug: productData.slug,
        price: productData.price,
        description: productData.description,
        category: productData.category,
      };

      // Update the product in Sanity
      await client.createOrReplace(updatedProduct); // Using `createOrReplace` for updating

      alert('Product updated successfully!');
      router.push('/product'); // Redirect to the product listing page after successful update
    } catch (error) {
      setError('Error updating the product');
      console.error('Error updating product:', error);
    }
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  if (loading) return (
    <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif] flex justify-center items-center">
      <div className="text-white text-xl">Please Wait, Product is Loading...</div>
    </div>
  );
  
  if (error) return <div>{error}</div>;

  return (
    <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Content Area */}
        <main className="ml-[270px] max-lg:ml-0 max-lg:w-full p-6 bg-[#070b18] min-h-screen w-full">
          <h1 className="text-white text-3xl font-semibold">Edit Product</h1>

          {/* Edit Product Form */}
          <div className="p-4 mx-auto max-w-xl bg-white font-[sans-serif] mt-8">
            <h1 className="text-2xl text-gray-800 font-bold text-center">Edit Product</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Name Field */}
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              {formErrors.name && <span className="text-red-600 text-sm">{formErrors.name}</span>}

              {/* Title Field */}
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
                placeholder="Product Title"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              {formErrors.title && <span className="text-red-600 text-sm">{formErrors.title}</span>}

              {/* Slug Field */}
              <input
                type="text"
                name="slug"
                value={productData.slug}
                onChange={handleChange}
                placeholder="Product Slug"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              {formErrors.slug && <span className="text-red-600 text-sm">{formErrors.slug}</span>}

              {/* Price Field */}
              <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Product Price"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              {formErrors.price && <span className="text-red-600 text-sm">{formErrors.price}</span>}

              {/* Description Field */}
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Product Description"
                rows={4}
                className="w-full px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm pt-3 outline-none transition-all"
              />

              {/* Category Field */}
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                placeholder="Product Category"
                className="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-black focus:bg-transparent text-sm outline-none transition-all"
              />
              {formErrors.category && <span className="text-red-600 text-sm">{formErrors.category}</span>}

              {/* Submit Button */}
              <button
                type="submit"
                className="text-white bg-black hover:bg-gray-900 tracking-wide text-sm px-4 py-2.5 w-full outline-none"
              >
                Update Product
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
