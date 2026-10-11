import OrderStatusBadge from "@/components/order-status-badge";
import { Badge } from "@/components/ui/badge";
import { OrderWithItemsAndProduct } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  order: OrderWithItemsAndProduct;
}

function StatusBadge({status} : {status: string}) {
    const statusMap: Record<string, string> = {
        pending: "Pending",
        pending_payment: "Pending Payment",
        payment_processed: "Payment Processing",
        failed: "Failed",
        paid: "Paid",
    };
    return <Badge variant="outline">{statusMap[status] ?? status}</Badge>
}

export default async function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="flex flex-col pt-4">
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Subtotal</p>
          <p className="text-base text-foreground">
            {formatPrice(order.total)}
          </p>
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Taxes</p>
          <p>{formatPrice(0)}</p>
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Shipping</p>
          <p>{formatPrice(0)}</p>
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3">
          <p>Status</p>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex items-center justify-between border-b pb-1 mb-3 font-semibold">
          <p>Total</p>
          <p className="text-base text-foreground">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>
    </div>
  );
}