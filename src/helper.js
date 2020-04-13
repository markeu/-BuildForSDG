
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
    const factor = Number.parseInt(numberOfDays / 3, 10);
  
    return 2 ** factor;
  };
  

  const bedSpaceByRequestedTimeComputation = (totalHospitalBeds, severeCases) => {
    const availableBedSpace = totalHospitalBeds * 0.35;
    return Number.parseInt(availableBedSpace - severeCases, 10);
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
  
    return Number.parseInt(dollarsInFlight, 10);
  };
  
  export {
    switchDurationToDays,
    checkNumberOfInfectionFactor,
    bedSpaceByRequestedTimeComputation,
    dollarsInFlightComputation
  };