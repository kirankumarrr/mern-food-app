export const orderStatusList = [
  'placed',
  'canceled',
  'processing',
  'inRoute',
  'delivered',
  'received',
];

export const userOrderStatus = {
  placed: {
    buttonName: 'Cancel',
    value: 'canceled',
  },
  delivered: {
    buttonName: 'Received',
    value: 'received',
  },
};
export const ownerOrderStatus = {
  placed: {
    buttonName: 'Processing',
    value: 'processing',
  },
  processing: {
    buttonName: 'InRoute',
    value: 'inRoute',
  },
  inRoute: {
    buttonName: 'Delivered',
    value: 'delivered',
  },
};
export const roleList = {
  user: userOrderStatus,
  owner: ownerOrderStatus,
};
