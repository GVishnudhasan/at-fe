export default async function handler(request, response) {
  response.status(200).send({
    response: [
      {
        id: '1',
        eventName: 'Diwali Celebration',
        eventId: 'PT01',
        eventDescription: 'We provided donation to marginalized community.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Tiruchengode',
        eventParticipantCount: '170',
      },
      {
        id: '2',
        eventName: 'Rehab meet for Alcoholics',
        eventId: 'PT02',
        eventDescription: 'We provided donation to marginalized community.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Tiruchengode',
        eventParticipantCount: '870',
      },
      {
        id: '3',
        eventName: 'Conference on Drug Abuse',
        eventId: 'PT03',
        eventDescription: 'We provided donation to marginalized community.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Tiruchengode',
        eventParticipantCount: '70',
      },
      {
        id: '4',
        eventName: 'Annual Meeting',
        eventId: 'PT04',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Coimbatore',
        eventParticipantCount: '150',
      },
      {
        id: '5',
        eventName: 'Support for Mental Health',
        eventId: 'PT05',
        eventDescription:
          ' We celebrate in Diwali function at our Atchayam Rehabilitation center.',
        eventDate: '23/10/2022',
        eventVenueLocation: 'Coimbatore',
        eventParticipantCount: '520',
      },
      {
        id: '6',
        eventName: 'Birthday Celebration',
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
