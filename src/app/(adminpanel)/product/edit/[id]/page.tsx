'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SidebarMenu from '../../../admincomponents/SidebarMenu';
import client from '@/sanity/sanity.client';

interface Product {
  _id: string;
  _type: string;
  name: string;
  title: string;
  slug: string;
  price: string;
  description: string;
  category: string;
}

export default function EditProduct() {
  const [productData, setProductData] = useState<Product>({
    _id: '',
    _type: 'products',
    name: '',
    title: '',
    slug: '',
    price: '',
    description: '',
    category: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Product>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string; // Get product ID from URL params safely

  // Check authentication
  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/');
    }
  }, [router]);

  // Fetch product data
  useEffect(() => {
    if (productId && isAuthenticated) {
      const fetchProductData = async () => {
        try {
          const query = `*[_type == "products" && _id == $productId][0]`;
          const product = await client.fetch(query, { productId });

          if (product) {
            setProductData({
              _id: product._id || '',
              _type: 'products',
              name: product.name || '',
              title: product.title || '',
              slug: product.slug || '',
              price: product.price || 0,
              description: product.description || '',
              category: product.category || '',
            });
          } else {
            setError('Product not found.');
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(`Error fetching product data: ${err.message}`);
          } else {
            setError('An unknown error occurred while fetching product data.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [productId, isAuthenticated]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) || 0 : value, // Ensure price is a number
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors: Partial<Product> = {};
    if (!productData.name) errors.name = 'Name is required';
    if (!productData.title) errors.title = 'Title is required';
    if (!productData.slug) errors.slug = 'Slug is required';
    if (!productData.price) errors.price = 'Price is required';
    if (!productData.category) errors.category = 'Category is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await client.createOrReplace(productData);
      alert('Product updated successfully!');
      router.push('/product');
    } catch (err) {
      setError('Error updating the product.');
      console.error('Error updating product:', err);
    }
  };

  if (!isAuthenticated) return null; // Prevent rendering before authentication check

  if (loading)
    return (
      <div className="relative bg-[#070b18] h-full min-h-screen flex justify-center items-center">
        <div className="text-white text-xl">Please Wait, Product is Loading...</div>
      </div>
    );

  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="relative bg-[#070b18] h-full min-h-screen">
      <div className="flex">
        <SidebarMenu />

        <main className="ml-[270px] max-lg:ml-0 max-lg:w-full p-6 bg-[#070b18] min-h-screen w-full">
          <h1 className="text-white text-3xl font-semibold">Edit Product</h1>

          <div className="p-4 mx-auto max-w-xl bg-white mt-8 rounded-lg shadow-md">
            <h1 className="text-2xl text-gray-800 font-bold text-center">Edit Product</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {['name', 'title', 'slug', 'price', 'category'].map((field) => (
                <div key={field}>
                  <input
                    type={field === 'price' ? 'number' : 'text'}
                    name={field}
                    value={productData[field as keyof Product]}
                    onChange={handleChange}
                    placeholder={`Product ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    className="w-full py-2 px-4 border rounded-md focus:border-black text-gray-800"
                  />
                  {formErrors[field as keyof Product] && (
                    <span className="text-red-600 text-sm">{formErrors[field as keyof Product]}</span>
                  )}
                </div>
              ))}

              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Product Description"
                rows={4}
                className="w-full px-4 py-2 border rounded-md text-gray-800"
              />

              <button type="submit" className="text-white bg-black hover:bg-gray-900 px-4 py-2 w-full rounded-md">
                Update Product
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
