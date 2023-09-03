import { Order } from '@prisma/client';
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

const getOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getOrders,
};
