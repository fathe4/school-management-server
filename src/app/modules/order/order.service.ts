import { Order, Roles } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
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

const getOrders = async (user: JwtPayload | null) => {
  const userOrders = await prisma.order.findMany({
    where: {
      userId: user?.id,
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
  return user?.role === Roles.customer ? userOrders : allOrders;
};

const getOrder = async (
  user: JwtPayload,
  orderId: string
): Promise<Order | null> => {
  const orderResult = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderedBooks: true,
    },
  });
  const isUserOrder = orderResult?.userId == user?.id;
  if (isUserOrder) {
    return orderResult;
  } else if (user.role === Roles.admin) {
    return orderResult;
  }
  return null;
};

export const OrderService = {
  insertIntoDB,
  getOrders,
  getOrder,
};
