exports.get24HoursTime = timeParam => {
  let time = null;
  //split by space
  const timeArray = timeParam.split(' ');
  //separete time string in different individual units
  const hourMinute = timeArray[0].split(':');
  let hour = hourMinute[0];
  const minute = hourMinute[1];
  //check if 12 hours needs to be added
  const timePeriod = timeArray[1];
  //if the period is PM, + 12 hours
  if (timePeriod === 'PM') {
    hour = +hour + 12;
  }
  //reconstruct the time
  time = `${hour}:${minute}`;
  return time;
};

exports.get12HoursTime = timeParam => {
  let time = null;
  let period = '';
  //split by space
  //separete time string in different individual units
  const hourMinute = timeParam.split(':');
  let hours = hourMinute[0];
  const minute = hourMinute[1];
  //check if 12 hours needs to be
  //if the period is PM, + 12 hours
  if (hours === 24) {
    period = 'AM';
    hours = '0';
  } else {
    period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }
  //reconstruct the time
  time = `${hours}:${minute}${period}`;
  return time;
};
