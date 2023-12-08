export const getTotalAmount = (data: any[]) => {
  return data.reduce((acc, item) => {
    return (
      acc +
      item?.product_id?.unit_price *
        item.product_id?.pieces_per_package *
        item?.quantity
    );
  }, 0);
};
