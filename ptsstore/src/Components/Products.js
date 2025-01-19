// import React, { useEffect, useState } from 'react';
// import Productserver from './Productserver';  // Importing the Productserver component

// const ProductsList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('./db.json');
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data.products); // Accessing the `products` array in the JSON
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Product List</h1>
//       <ul>
//         <Productserver/>
//         {products.map((product) => (
//           <li key={product.id}>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Status: {product.status}</p>
//             <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
//             <p>Updated At: {new Date(product.updatedAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductsList;
