export default async function handler(request, response) {
  response.status(200).send({
    response: [
      {
        id: '1',
        informerId: 'INF001',
        informerName: 'Tamil',
        informerContactDetail: '+91 90067 89090',
        informerDesignation: 'Carpenter',
        informerNative: 'Erode',
        reference: 'Facebook',
      },
      {
        id: '2',
        informerId: 'INF002',
        informerName: 'Naveen',
        informerContactDetail: '+91 90067 89090',
        informerDesignation: 'Carpenter',
        informerNative: 'Erode',
        reference: 'Facebook',
      },
      {
        id: '3',
        informerId: 'INF001',
        informerName: 'Tamil',
        informerContactDetail: '+91 90067 89090',
        informerDesignation: 'Carpenter',
        informerNative: 'Erode',
        reference: 'Facebook',
      },
      {
        id: '4',
        informerId: 'INF001',
        informerName: 'Tamil',
        informerContactDetail: '+91 90067 89090',
        informerDesignation: 'Carpenter',
        informerNative: 'Erode',
        reference: 'Facebook',
      },
    ],
  });
}
