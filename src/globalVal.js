// const awsUrl = ;
const compositeUrl = 'http://127.0.0.1:8080';
const userProfileUrl = 'http://127.0.0.1:8000';
const appTrackerUrl = 'http://127.0.0.1:8001';

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
