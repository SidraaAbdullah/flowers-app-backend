import { User } from '../models';
import Delivery from '../models/delivery-address';
import { getDeliveryQuery, patchDeliveryQuery, patchUserQuery } from '../utils/user';

export const createDeliveryAddress = async (req, res) => {
  try {
    let primary = true;
    const addressAlready = await Delivery.findOne({
      address: req.body.address,
      user_id: req.user._id,
    });
    if (addressAlready) {
      return res.status(400).json({
        message: 'This address already belongs to this user',
      });
    }
    const isAlreadyAddress = await Delivery.findOne({ user_id: req.user._id });
    if (isAlreadyAddress.length) primary = false;
    const newDeliveryAddress = await Delivery.create({
      ...req.body,
      user_id: req.user._id,
      primary,
    });
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
    const query = patchDeliveryQuery(req.body);
    if (query.primary) {
      await Delivery.updateMany({ user_id: req.user._id }, { primary: false });
      await Delivery.updateOne({ _id: req.body.delivery_address_id }, { primary: true });
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

export const updateUserProfile = async (req, res) => {
  try {
    const query = patchUserQuery(req.body);
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        message: 'Nothing to update',
      });
    }
    await User.updateOne({ _id: req.user._id }, query);
    return res.status(200).json({
      message: 'User profile has been updated',
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.',
      error: error.toString(),
    });
  }
};
