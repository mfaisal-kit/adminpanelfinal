"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarMenu from "../admincomponents/SidebarMenu";
import client from "@/sanity/sanity.client"; // Adjust path to your sanity client

// Define the Product interface based on the schema fields
interface Product {
  _id: string;
  name: string;
  title: string;
  slug: string;
  price: string;
  description: string;
  category: string;
  image: string;
  thumbnail: string;
  rating: string;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsAuthenticated(true); // User is authenticated
      fetchProducts(); // Fetch products only if authenticated
    } else {
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [router]);

  // Fetch products from Sanity using useEffect
  const fetchProducts = async () => {
    const query = "*[_type == 'products']"; // Query to fetch all products
    const fetchedProducts = await client.fetch(query);
    setProducts(fetchedProducts);
  };

  // Handle product deletion
  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setShowConfirmation(true); // Show confirmation modal
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await client.delete(productToDelete); // Delete the product from Sanity
        setProducts((prev) => prev.filter((product) => product._id !== productToDelete));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
    setShowConfirmation(false); // Hide confirmation modal
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false); // Hide confirmation modal
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering of the product page if not authenticated
  }

  return (
    <>
      <div className="relative bg-[#070b18] h-full min-h-screen font-[sans-serif]">
        <div className="flex items-start">
          {/* Sidebar */}
          <SidebarMenu />

          {/* Content Area */}
          <main className={`ml-[270px] max-lg:ml-0 max-lg:w-full p-6 bg-[#070b18] min-h-screen w-full`}>
            {/* Heading and Add Product Button in one line */}
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-white text-3xl font-semibold">Product Page</h1>
              <a
                href={`/product/add`}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Product
              </a>
            </div>

            {/* Responsive Table */}
            <div className="font-sans overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 whitespace-nowrap">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-4 text-sm text-gray-800">{product.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-800">{product.title}</td>
                      <td className="px-4 py-4 text-sm text-gray-800">{product.price}</td>
                      <td className="px-4 py-4 text-sm text-gray-800">{product.category}</td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        <a
                          href={`product/edit/${product._id}`}
                          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                          Edit Product
                        </a>
                        <button
                          className="text-red-600 ml-4"
                          onClick={() => handleDeleteClick(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl text-center font-semibold mb-4">Are you sure?</h2>
            <p className="text-center mb-6">This action cannot be undone.</p>
            <div className="flex justify-around">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
