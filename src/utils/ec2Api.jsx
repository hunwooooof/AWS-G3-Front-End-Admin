const ec2Api = {
  hostname: 'https://ygolonhcet.online',
  async signin(data) {
    const response = await fetch(`${this.hostname}/api/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async getAllCoupons(jwtToken) {
    const response = await fetch(`${this.hostname}/api/marketing/coupons`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    return await response.json();
  },

  async addMarketingCoupon(data, jwtToken) {
    const response = await fetch(`${this.hostname}/api/marketing/coupons`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
      body: JSON.stringify(data),
      method: 'POST',
    });
    return await response.json();
  },
  // async deleteCollection(id, jwtToken) {
  //   const response = await fetch(`${this.hostname}/api/v1/collection`, {
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${jwtToken}`,
  //     }),
  //     body: JSON.stringify({ productId: id, method: 'delete' }),
  //        method: 'POST',
  //   });
  //   return await response.json();
  // },
};

export default ec2Api;
