//const compositeUrl = 'http://127.0.0.1:8005';
//const userProfileUrl = 'http://localhost:8080';
//const appTrackerUrl = 'http://localhost:8000';
//const jobSearchUrl = 'http://127.0.0.1:8002';
const userProfileUrl = 'http://44.211.146.131:8080';
const appTrackerUrl = 'https://coms-4153-application-tracker.uc.r.appspot.com';
const compositeUrl = 'https://coms-4153-composite.uc.r.appspot.com';
const jobSearchUrl = 'http://3.213.98.62:8080';



const baseUrl = () => {
    return compositeUrl;
}

// eslint-disable-next-line
export default {
    compositeUrl: compositeUrl,
    userProfileUrl: userProfileUrl,
    appTrackerUrl: appTrackerUrl,
    jobSearchUrl: jobSearchUrl,
    // baseUrl: awsUrl
}
