import ShortUniqueId from 'short-unique-id';
import { ORDER_STATUSES, USER_TYPES } from '../constants';
import { Driver, Stock } from '../models';
import orders from '../models/orders';
import product from '../models/product';
import { paginateData } from '../utils';
import { getOrdersQuery } from '../utils/order';

export const createOrders = async (req, res) => {
  try {
    const { products } = req.body;

    // UPDATING STOCK IN DB
    for (const product of products) {
      await Stock.updateOne(
        { product_id: product.product_id },
        { $inc: { quantity: `-${product.quantity}` } },
      );
    }

    // ORDER ID
    const uid = new ShortUniqueId({ length: 10 });
    const newProduct = await orders.create({ ...req.body, user_id: req.user._id, uid: uid() });

    // RESPONSE
    res.status(200).json({
      message: 'Order successfully created',
      data: newProduct,
    });
    const orderSocket = await orders
      .findById(newProduct._id)
      .populate([
        { path: 'products.product_id', populate: ['category_id', 'created_by'] },
        { path: 'deliveryAddress' },
      ]);
    console.log('order kr rha hun wait!');
    req.io.of('/driver').emit('new_order', orderSocket);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const query = getOrdersQuery(req.query, req.user);
    const { data, pagination } = await paginateData(orders, query, req.query, [
      { path: 'products.product_id', populate: ['category_id', 'created_by'] },
      { path: 'deliveryAddress' },
      { path: 'user_id' },
    ]);
    return res.status(200).json({
      pagination,
      data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const order_id = req.params.id;
    const { status, type } = req.body;
    const updateQuery = { _id: order_id };
    await orders.updateOne(updateQuery, { status });

    // FOR CONSUMER APP
    req.io.sockets.emit(`${order_id}_statusUpdate`, status);

    if (status === ORDER_STATUSES['DRIVER-ASSIGNED'] && type === USER_TYPES.DRIVER) {
      const order = await orders.findById(order_id);
      if (order.driver_id) {
        return res.status(400).json({
          message: `Driver is already assigned to this order`,
          driver_id: order.driver_id,
        });
      }
      if (req.user._id) await orders.updateOne(updateQuery, { driver_id: req.user._id });
    }
    res.status(200).json({
      message: `Order status has been update to: ${status}`,
      driver_id: type === USER_TYPES.DRIVER ? req.user._id : undefined,
    });

    // FOR DRIVER
    req.io.of('/driver').emit(`${order_id}_statusUpdate`, status);
    req.io.of('/driver').emit('update_status', {
      order_id,
      status,
      driver_id: type === USER_TYPES.DRIVER ? req.user._id : undefined,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};

export const rateOrderedProducts = async (req, res) => {
  try {
    const order_id = req.params.id;
    const { productsRating, comment, driver_rating } = req.body;
    let products = [];
    const updateQuery = { _id: order_id };
    const payloadOrder = await orders.findById(order_id);
    for (const productRate of payloadOrder.products) {
      const oneProduct = productsRating.find(
        (item) => item.product_id === productRate.product_id.toString(),
      );
      products = [
        ...products,
        { ...productRate._doc, rating: oneProduct && (oneProduct.rating || 0) },
      ];
    }
    for (const productRate of productsRating) {
      if (productRate.rating) {
        const oneProduct = await product.findById(productRate.product_id);
        const rating =
          typeof oneProduct.rating === 'undefined'
            ? productRate.rating
            : ((oneProduct.rating || 0) + (productRate.rating || 0)) / 2;
        await product.updateOne({ _id: productRate.product_id }, { rating });
      }
    }
    await orders.updateOne(updateQuery, { comment, products, driver_rating });
    if (driver_rating) {
      const driverLoad = await Driver.findById(payloadOrder.driver_id);
      await Driver.updateOne(
        { _id: payloadOrder.driver_id },
        {
          rating:
            typeof driverLoad.rating === 'undefined'
              ? driver_rating
              : ((+driver_rating || 0) + (+driverLoad.rating || 0)) / 2,
        },
      );
    }
    return res.status(200).json({
      message: `Order rating has been added!`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error,
    });
  }
};
