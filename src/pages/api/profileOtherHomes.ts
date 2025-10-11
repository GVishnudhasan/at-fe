export default async function handler(request, response) {
  response.status(200).send({
    response: [
      {
        id: '1',
        eventName: 'Old Age Home',
        eventDescription:
          'Home for Elders, Providing health care and taking care of day to day needs of elderly.',
        eventVenueLocation: 'Erode Railway Station',
      },
      {
        id: '2',
        eventName: 'Mental Rehab Center',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventVenueLocation: 'Coimbatore',
      },
      {
        id: '3',
        eventName: 'Home for Physically Disabled',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventVenueLocation: 'Coimbatore',
      },
      {
        id: '4',
        eventName: 'Sheela Wellness Center',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventVenueLocation: 'Coimbatore',
      },
      {
        id: '5',
        eventName: 'Pragathi Trust for Women',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventVenueLocation: 'Coimbatore',
      },
      {
        id: '6',
        eventName: 'Sakthi Chariatable Trust',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventVenueLocation: 'Coimbatore',
      },
    ],
  });
}
