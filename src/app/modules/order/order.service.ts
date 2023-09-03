import { Order, Roles } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  userId: string,
  data: { orderedBooks: { bookId: string; quantity: number }[] }
): Promise<Order | null> => {
  const order = await prisma.order.create({
    data: { userId },
  });
  const orderedBooks = data.orderedBooks.map(ord => ({
    orderId: order.id,
    ...ord,
  }));
  console.log(orderedBooks);

  await prisma.orderedBook.createMany({
    data: orderedBooks,
  });

  const newOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: {
      orderedBooks: true,
    },
  });
  return newOrder;
};

const getOrders = async ({ id, role }: { id: string; role: string }) => {
  const userOrders = await prisma.order.findMany({
    where: {
      userId: id,
    },
    include: {
      orderedBooks: true,
    },
  });
  const allOrders = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return role === Roles.customer ? userOrders : allOrders;
};

export const OrderService = {
  insertIntoDB,
  getOrders,
};
