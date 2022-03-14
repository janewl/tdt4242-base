let statistics
let weeklyWorkoutCount

window.addEventListener("DOMContentLoaded", async () => {
  statistics = await getUserWorkoutStatistics();
  weeklyWorkoutCount = countWorkoutsByCurrentWeek();
})

//Retrieves the completed workouts of a user
async function getUserWorkoutStatistics(){
  let response = await sendRequest('GET', `${HOST}/api/statistics/`);
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  } else {
      let data = await response.json();
      return data.results;
  }
}

//create statistics chart
const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'july', 
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const weekdayLabels = [
      'Monday', 
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
  ]

  const data = {
    labels: weekdayLabels,
    datasets: [{
      label: 'How many workouts you have completed',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: weeklyWorkoutCount,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  //count workouts (by week/ month)
  function countWorkoutsByCurrentWeek() {
    let workoutCount = [0, 0, 0, 0, 0, 0, 0];
    const currentWeek = getWeek(new Date())
    statistics.forEach((entity) => 
    {
      const workoutDate = new Date(entity.date)
      const workoutCompletedWeek = getWeek(workoutDate)
      if(workoutCompletedWeek === currentWeek){
        const dayOfWeek = workoutDate.getDay();
        workoutCount[dayOfWeek-1] += 1;
      }
    })
    return workoutCount;
  }

// Source: https://weeknumber.com/how-to/javascript
// Returns the ISO week of the date.
function getWeek(date) {
  var newdate = new Date(date);
  newdate.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  newdate.setDate(newdate.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(newdate.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((newdate.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}