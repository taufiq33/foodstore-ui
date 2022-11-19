function sumPrice(items) {
  return items.reduce((previousTotal, item) => previousTotal + (item.price * item.qty), 0);
}

export default sumPrice;
