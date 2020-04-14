<<<<<<< HEAD
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

    const currentlyInfected = Number.parseInt(reportedCases * 10, 10);
    const severeImpactCurrentlyInfected = Number.parseInt(reportedCases * 50, 10);

    const infectedByRequestedTime = Number.parseInt(currentlyInfected * factor, 10);
    const severeImpactInfectedByRequestedTime = Number.parseInt(severeImpactCurrentlyInfected * factor, 10);

    const severeCasesByRequestedTime = Number.parseInt(0.15 * infectedByRequestedTime, 10);
    const severeImpactSevereCasesByReqTime = Number.parseInt(0.15 * severeImpactInfectedByRequestedTime, 10);

    const hospitalBedsByRequestedTime = bedSpaceByRequestedTimeComputation(totalHospitalBeds, severeCasesByRequestedTime);
    const severeImpactHospitalBedByRequestedTime = bedSpaceByRequestedTimeComputation(totalHospitalBeds, severeImpactSevereCasesByReqTime);

    const casesForICUByRequestedTime = Number.parseInt(0.05 * infectedByRequestedTime, 10);
    const severeImpactCasesForICUByReqTime = Number.parseInt(0.05 * severeImpactInfectedByRequestedTime, 10);

    const casesForVentilatorByRequestedTime = Number.parseInt(0.02 * infectedByRequestedTime, 10);
    const severeImpactCasesForVentilatorByReqTime = Number.parseInt(0.02 * severeImpactInfectedByRequestedTime, 10);

    const dollarsInFlight = dollarsInFlightComputation(data, infectedByRequestedTime);
    const severeImpactDollarsInFlight = dollarsInFlightComputation(data, severeImpactInfectedByRequestedTime);

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


=======
const covid19ImpactEstimator = (data) => data;

export default covid19ImpactEstimator;
>>>>>>> e0bbc6f2d2386f2598ff54c624f51285783d7f1b
