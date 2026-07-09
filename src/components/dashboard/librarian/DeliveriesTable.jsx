"use client";

import { confirmDelivery } from "@/lib/action/delevary";
import { Avatar, Button, Chip, Table } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const deliveryColorMap = {
  delevared: "success",
  pending: "warning",
};

export default function DeliveriesTable({ payments }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleConfirmDelivery = async (id) => {
    try {
      setLoadingId(id);
      const payload = {
        delevaryStatus : "delevared"
      };
      const res = await confirmDelivery(id ,payload);

      if (res) {
        toast.success("Delivery confirmed successfully");
        router.refresh();
      } else {
        toast.error("Failed to confirm delivery");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Deliveries Table" className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader id="book">
              Book
            </Table.Column>
            <Table.Column id="customer">Customer</Table.Column>
            <Table.Column id="price">Price</Table.Column>
            <Table.Column id="payment">Payment</Table.Column>
            <Table.Column id="delivery">Delivery</Table.Column>
            <Table.Column id="date">Date</Table.Column>
            <Table.Column className="text-end" id="actions">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {payments.map((payment) => {
              const isDelivered = payment.delevaryStatus === "delevared";
              const isLoading = loadingId === payment._id;

              return (
                <Table.Row key={payment._id} id={payment._id}>
                  {/* Book */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-12 shrink-0 rounded overflow-hidden border border-zinc-700">
                        <Image
                          src={payment.image}
                          alt={payment.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <span className="text-sm font-medium max-w-[160px] truncate">
                        {payment.title}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Customer */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Fallback>
                          {payment.userEmail?.[0]?.toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>

                      <span className="text-xs text-muted">
                        {payment.userEmail}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Price */}
                  <Table.Cell>
                    <span className="font-medium">${payment.price}</span>
                  </Table.Cell>

                  {/* Payment Status */}
                  <Table.Cell>
                    <Chip
                      color={
                        payment.paymentStatus === "paid" ? "success" : "danger"
                      }
                      size="sm"
                      variant="soft"
                    >
                      {payment.paymentStatus}
                    </Chip>
                  </Table.Cell>

                  {/* Delivery Status */}
                  <Table.Cell>
                    <Chip
                      color={
                        deliveryColorMap[payment.delevaryStatus] || "warning"
                      }
                      size="sm"
                      variant="soft"
                    >
                      {payment.delevaryStatus}
                    </Chip>
                  </Table.Cell>

                  {/* Date */}
                  <Table.Cell>
                    <span className="text-xs text-muted">
                      {new Date(payment.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex justify-end">
                      {isDelivered ? (
                        <Chip color="success" size="sm" variant="soft">
                          Delivered ✓
                        </Chip>
                      ) : (
                        <Button
                          isLoading={isLoading}
                          size="sm"
                          variant="secondary"
                          onPress={() => handleConfirmDelivery(payment._id)}
                        >
                          Confirm Delivery
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
