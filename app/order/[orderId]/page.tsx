import { prisma } from "@/lib/prisma";
import OrderItem from "./order-item";
import OrderSummary from "./order-summary";
import { auth } from "@/lib/auth";
import { Breadcrumbs } from "@/components/breadcrumb";

interface OrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;
  const order = await prisma?.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  const session = await auth();
  const isOwner = order?.userId === session?.user?.id;
  return (
    <main className="container mx-auto py-4">
      {isOwner && (
        <Breadcrumbs
          items={[
            {
              label: "My Account",
              href: "/account",
            },
            {
              label: `Order ${orderId}`,
              href: `/order/${orderId}`,
            },
          ]}
        />
      )}
      <ul>
        {order?.items.map((item) => (
          <OrderItem key={item.id} orderItem={item} />
        ))}
      </ul>
      <OrderSummary order={order!} />
    </main>
  );
}
