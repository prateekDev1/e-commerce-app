import { getProductBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sleep } from "@/lib/actions";
import Image from "next/image";

// helps with generating metadata for the product page based on the product's slug : type of dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    // used for search engines like google to display rich snippets in search results
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  await sleep(1000)
  return (
    <main className="container mx-auto py-4">
      {/* <Breadcrumbs items={breadcrumbs} /> */}

      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden h-50 md:h-100">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>

              <Badge variant="outline">{product.category?.name}</Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Description</h2>
              <p>{product.description}</p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="font-medium">Availibility</h2>

              <div className="flex items-center gap-2">
                {product.inventory > 0 ? (
                  <Badge variant="outline" className="text-green-600">
                    In stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600">
                    Out of stock
                  </Badge>
                )}

                {product.inventory > 0 && (
                  <span className="text-xs text-gray-500">
                    ({product.inventory} items available)
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* <AddToCartButton product={product} /> */}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
