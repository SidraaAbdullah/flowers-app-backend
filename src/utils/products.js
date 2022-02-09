export const getProductsQuery = (params) => {
  let query = {};
  if (params.category_id) {
    query.category_id = params.category_id;
  }
  if (params.search) {
    query = {
      ...query,
      $or: [
        { description: { $regex: params.search.trim(), $options: 'i' } },
        { name: { $regex: params.search.trim(), $options: 'i' } },
        { status: { $regex: params.search.trim(), $options: 'i' } },
      ],
    };
  }
  return query;
};

export const getCategoriesQuery = (params) => {
  let query = {};
  if (params.search) {
    query = {
      ...query,
      $or: [
        { description: { $regex: params.search.trim(), $options: 'i' } },
        { name: { $regex: params.search.trim(), $options: 'i' } },
      ],
    };
  }
  return query;
};
export const patchProductUpdate = (params) => {
  let query = {};
  if (params.name) {
    query.name = params.name;
  }
  if (params.price) {
    query.price = params.price;
  }
  if (params.category_id) {
    query.category_id = params.category_id;
  }
  if (params.image) {
    query.image = params.image;
  }
  if (params.status) {
    query.status = params.status;
  }
  if (params.description) {
    query.description = params.description;
  }
  if (params.quantity) {
    query.quantity = params.quantity;
  }
  return query;
};
