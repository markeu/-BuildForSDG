
const switchDurationToDays = ({ periodType, timeToElapse }) => {
  let days;

  switch (periodType) {
    case 'weeks':
      days = timeToElapse * 7;
      break;
    case 'months':
      days = timeToElapse * 30;
      break;
    default:
      days = timeToElapse;
      break;
  }
  return days;
};

const checkNumberOfInfectionFactor = (data) => {
  const numberOfDays = switchDurationToDays(data);
  const factor = Math.trunc(numberOfDays / 3);

  return Math.pow(2, factor);
};


const bedSpaceByRequestedTimeComputation = (totalHospitalBeds, severeCases) => {
  const availableBedSpace = totalHospitalBeds * 0.35;
  return Math.trunc(availableBedSpace - severeCases);
};


const dollarsInFlightComputation = (data, infectionsByRequestedTime) => {
  const dayPeriod = switchDurationToDays(data);
  const {
    region: {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    }
  } = data;

  const dollarsInFlight = (infectionsByRequestedTime * avgDailyIncomePopulation
      * avgDailyIncomeInUSD) / dayPeriod;

  return Math.trunc(dollarsInFlight);
};

export {
  switchDurationToDays,
  checkNumberOfInfectionFactor,
  bedSpaceByRequestedTimeComputation,
  dollarsInFlightComputation
};
