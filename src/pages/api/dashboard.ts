export default async function handler(request, response) {
  response.status(200).send({
    id: '1',
    rescuedClients: '25',
    inHouseClients: '13',
    movedClients: '08',
    fieldVisits: '05',
    rehabs: '12',
    volunteers: '45',
    informers: '06',
    inquiries: '17',
  });
}
