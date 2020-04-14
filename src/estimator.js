import {
  checkNumberOfInfectionFactor,
  bedSpaceByRequestedTimeComputation,
  dollarsInFlightComputation
} from './helper';

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    totalHospitalBeds
  } = data;
  const factor = checkNumberOfInfectionFactor(data);

  const currentlyInfected = Math.trunc(reportedCases * 10);
  const severeImpactCurrentlyInfected = Math.trunc(reportedCases * 50);

  const infectedByRequestedTime = Math.trunc(currentlyInfected * factor);
  const severeImpactInfectedByRequestedTime = Math.trunc(
    severeImpactCurrentlyInfected * factor
  );

  const severeCasesByRequestedTime = Math.trunc(
    0.15 * infectedByRequestedTime
  );
  const severeImpactSevereCasesByReqTime = Math.trunc(
    0.15 * severeImpactInfectedByRequestedTime
  );

  const hospitalBedsByRequestedTime = bedSpaceByRequestedTimeComputation(
    totalHospitalBeds, severeCasesByRequestedTime
  );
  const severeImpactHospitalBedByRequestedTime = bedSpaceByRequestedTimeComputation(
    totalHospitalBeds, severeImpactSevereCasesByReqTime
  );

  const casesForICUByRequestedTime = Math.trunc(
    0.05 * infectedByRequestedTime
  );
  const severeImpactCasesForICUByReqTime = Math.trunc(
    0.05 * severeImpactInfectedByRequestedTime
  );

  const casesForVentilatorByRequestedTime = Math.trunc(
    0.02 * infectedByRequestedTime
  );
  const severeImpactCasesForVentilatorByReqTime = Math.trunc(
    0.02 * severeImpactInfectedByRequestedTime
  );

  const dollarsInFlight = dollarsInFlightComputation(
    data, infectedByRequestedTime
  );
  const severeImpactDollarsInFlight = dollarsInFlightComputation(
    data, severeImpactInfectedByRequestedTime
  );

  return {
    data,
    impact: {
      currentlyInfected,
      infectedByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorByRequestedTime,
      dollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectedByRequestedTime: severeImpactInfectedByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByReqTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedByRequestedTime,
      casesForICUByRequestedTime: severeImpactCasesForICUByReqTime,
      casesForVentilatorByRequestedTime: severeImpactCasesForVentilatorByReqTime,
      dollarsInFlight: severeImpactDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
