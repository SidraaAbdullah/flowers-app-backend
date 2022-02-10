import { ORDER_STATUSES, USER_TYPES } from '../constants';

export const getOrdersQuery = (params, user) => {
  let query = { user_id: user._id };
  if (params.status) {
    query = { ...query, status: params.status };
  }
  if (params.order_id) {
    query = { ...query, _id: params.order_id };
  }
  if (params.type) {
    if (params.type === USER_TYPES.ADMIN) {
      query = {
        user_id: undefined,
      };
    }
    if (params.type === USER_TYPES.DRIVER) {
      query = {
        $or: [{ status: ORDER_STATUSES['IN-PROGRESS'] }, { driver_id: params.driver_id }],
      };
    }
  }
  return query;
};
