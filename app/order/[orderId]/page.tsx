import { prisma } from "@/lib/prisma";
import OrderItem from "./order-item";
import OrderSummary from "./order-summary";

interface OrderPageProps {
    params: Promise<{
      orderId: string;
    }>;
}

export default async function OrderPage({ params } : OrderPageProps) {
    const { orderId } = await params;
    const order = await prisma?.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    product: true,
                }
            }
        }
    });
    return (
        <main className="container mx-auto py-4">
            <ul>
                {order?.items.map((item) => (
                    <OrderItem key={item.id} orderItem={item} />
                ))}
            </ul>
            <OrderSummary order={order!} />
        </main>
    )
}