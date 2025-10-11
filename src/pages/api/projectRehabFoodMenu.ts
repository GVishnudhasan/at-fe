export default async function handler(request, response) {
  response.status(200).send({
    response: [
      {
        day: 'Monday',
        color: '#FFDED4',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
      {
        day: 'Tuesday',
        color: '#FFEACB',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
      {
        day: 'Wednesday',
        color: '#D7BABA',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
      {
        day: 'Thursday',
        color: '#ECE9FF',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
      {
        day: 'Friday',
        color: '#E6EFE5',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
      {
        day: 'Saturday',
        color: '#C5DCFF',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
      {
        day: 'Sunday',
        color: '#F2E1FF',
        foodTiming: {
          breakfast: ['Idly', 'Sambar', 'Chutney'],
          lunch: ['Lemon', 'Rice', 'Peanuts', 'Pickle'],
          dinner: ['Chapati', 'Potato', 'Buttermilk'],
        },
      },
    ],
  });
}
