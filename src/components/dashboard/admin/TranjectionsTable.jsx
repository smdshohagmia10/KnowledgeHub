import { Table } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const TranjectionsTable = ({ allPayments }) => {
    const headers = [
        "Cover",
        "Title", 
        "Price",
        "Date",
        "Delivery Status",
        "Payment Status",
        "Creat Pyment By",
    ];

    return (
        <Table aria-label="Transactions Table">
            <Table.ScrollContainer>
                <Table.Content className="min-w-[900px]">
                    
                    {/* TABLE HEAD */}
                    <Table.Header>
                        {headers.map((h) => (
                            <Table.Column isRowHeader key={h}>
                                {h}
                            </Table.Column>
                        ))}
                    </Table.Header>

                    {/* TABLE BODY */}
                    <Table.Body emptyContent={"No transactions found"}>
                        {allPayments?.map((payment) => {
                            const isDelivered = payment.delevaryStatus === "delevared" || payment.delevaryStatus === "delivered";
                            const isPaid = payment.paymentStatus === "paid";

                            return (
                                <Table.Row key={payment._id || payment.createdAt} id={payment._id}>

                                    {/* Cover */}
                                    <Table.Cell>
                                        <Image
                                            src={payment.image}
                                            alt={payment.title}
                                            width={70}
                                            height={100}
                                            className="w-9 h-12 object-cover rounded border border-zinc-700"
                                        />
                                    </Table.Cell>

                                    {/* Title */}
                                    <Table.Cell>
                                        <div className="truncate max-w-[140px] font-medium">
                                            {payment.title}
                                        </div>
                                    </Table.Cell>

                                    {/* Price */}
                                    <Table.Cell>
                                        <span className="font-medium">${payment.price}</span>
                                    </Table.Cell>

                                    {/* Date */}
                                    <Table.Cell>
                                        <span className="text-xs text-zinc-400">
                                            {new Date(payment.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </Table.Cell>

                                    {/* Delivery Status */}
                                    <Table.Cell>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                                            isDelivered
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        }`}>
                                            {payment.delevaryStatus}
                                        </span>
                                    </Table.Cell>

                                    {/* Payment Status */}
                                    <Table.Cell>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                                            isPaid
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-red-500/10 text-red-400 border-red-500/20"
                                        }`}>
                                            {payment.paymentStatus}
                                        </span>
                                    </Table.Cell>

                                    {/* User Email */}
                                    <Table.Cell>
                                        <span className="text-xs text-zinc-400">{payment.userEmail}</span>
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>

                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default TranjectionsTable;