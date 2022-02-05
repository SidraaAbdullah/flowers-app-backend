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
