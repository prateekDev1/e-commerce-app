import { getProducts, GetProductsParams } from "@/lib/actions";
import { ProductList } from "./product-list";
import { sleep } from "@/lib/actions";

interface ProductListServerWrapperProps {
  params: GetProductsParams;
}

export async function ProductListServerWrapper({
  params,
}: ProductListServerWrapperProps) {
  await sleep(1000);
  const products = await getProducts(params);
  return <ProductList products={products} />;
}
