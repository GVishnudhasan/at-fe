export default async function handler(request, response) {
  response.status(200).send({
    response: [
      {
        id: '1',
        eventName: 'Food Donation ',
        eventId: 'PT01',
        eventDescription: 'We provided donation to marginalized community.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Tiruchengode',
        eventParticipantCount: '170',
      },
      {
        id: '2',
        eventName: 'Blood  Donation Camp',
        eventId: 'PT02',
        eventDescription: 'We provided donation to marginalized community.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Tiruchengode',
        eventParticipantCount: '870',
      },
      {
        id: '3',
        eventName: 'Shelter to Homeless',
        eventId: 'PT03',
        eventDescription: 'We provided donation to marginalized community.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Tiruchengode',
        eventParticipantCount: '70',
      },
      {
        id: '4',
        eventName: 'Donation of Clothes to Children',
        eventId: 'PT04',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Coimbatore',
        eventParticipantCount: '150',
      },
      {
        id: '5',
        eventName: 'Donation of Hygiene Products',
        eventId: 'PT05',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Coimbatore',
        eventParticipantCount: '520',
      },
      {
        id: '6',
        eventName: 'Medical Care to Elderly',
        eventId: 'PT06',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Coimbatore',
        eventParticipantCount: '08',
      },
    ],
  });
}
