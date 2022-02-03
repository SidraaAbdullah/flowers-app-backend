import Delivery from '../models/delivery-address';
import { getDeliveryQuery, patchUserQuery } from '../utils/user';

export const createDeliveryAddress = async (req, res) => {
  try {
    const newDeliveryAddress = await Delivery.create({ ...req.body, user_id: req.user._id });
    return res.status(200).json({
      message: 'Address successfully created',
      data: newDeliveryAddress,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error.toString(),
    });
  }
};

export const getDeliveryAddress = async (req, res) => {
  try {
    const query = getDeliveryQuery(req.query);
    const newDeliveryAddress = await Delivery.find(query);
    return res.status(200).json({
      message: 'Address successfully found',
      data: newDeliveryAddress,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error.toString(),
    });
  }
};

export const deliveryUpdatePatch = async (req, res) => {
  try {
    const query = patchUserQuery(req.body);
    if (query.primary) {
      await Delivery.updateMany({ user_id: req.user._id }, { primary: false });
      await Delivery.updateOne(
        { _id: req.body.delivery_address_id },
        { primary: true },
      );
    }
    return res.status(200).json({
      message: 'Address updated',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error.toString(),
    });
  }
};
