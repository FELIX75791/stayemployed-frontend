// const awsUrl = ;
const compositeUrl = 'http://127.0.0.1:8080';
const userProfileUrl = 'http://localhost:8080';
const appTrackerUrl = 'http://localhost:8000';

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
