import { Product } from "../models/seller.Product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkSameSeller = async (productIds: any) => {
  console.log(productIds);
  const products = await Product.find({ _id: { $in: productIds } });
  console.log(products);
  if (products.length === 0) {
    console.log("No products found for the given IDs");
    return false;
  }
  // Extract the sellerId from the first product
  const firstSellerId = products[0].sellerId;

  // Check if all products have the same sellerId
  const allSameSeller = products.every(
    (product) => product.sellerId.toString() === firstSellerId.toString()
  );
  return allSameSeller;
};
