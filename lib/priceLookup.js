pricesDictionary = {
  '-1': 'Free',
  '0': '$',
  '1': '$$',
  '2': '$$$',
  '3': '$$$$'
};

pricesOrder = [-1, 0, 1, 2, 3];

priceLookup = function(priceValue) {
  if(_.isArray(priceValue)) {
    return priceValue.map(function(price) {
      return pricesDictionary[price];
    }).join(", ");
  } else {
    return pricesDictionary[priceValue];
  }
};