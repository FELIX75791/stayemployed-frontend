const compositeUrl = 'http://localhost:8082';
const userProfileUrl = 'http://localhost:8080';
const appTrackerUrl = 'http://localhost:8000';
const jobSearchUrl = 'http://localhost:8083';
//const userProfileUrl = 'http://44.211.146.131:8080';


const baseUrl = () => {
    return compositeUrl;
}

// eslint-disable-next-line
export default {
    compositeUrl: compositeUrl,
    userProfileUrl: userProfileUrl,
    appTrackerUrl: appTrackerUrl
    // baseUrl: awsUrl
}
