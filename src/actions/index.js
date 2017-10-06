import moment from "moment";

export const REQUEST_EVENTS = "REQUEST_EVENTS";
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const SET_DATE_FILTER = "SET_DATE_FILTER";
export const SET_TEXT_FILTER = "SET_TEXT_FILTER";


export const requestEvents = (city) => {
    return {
        type: REQUEST_EVENTS,
        city
    }
};

export const receiveEvents = (city, data = {"events": []}) => {
    return {
        type: RECEIVE_EVENTS,
        city,
        events: data.events,
        receivedAt: Date.now()
    }
};

export const setTextFilter = (textFilter) => {
    return {
        type: SET_TEXT_FILTER,
        textFilter
    }
};

export const setDateFilter = (dateFilter) => {
    return {
        type: SET_DATE_FILTER,
        dateFilter
    }
};

export const fetchEvents = (city) => {

    return (dispatch) => {

        dispatch(requestEvents(city));

        let apigClientFactory = require('aws-api-gateway-client').default;

        let additionalParams = {
            queryParams: {
                since: moment().utc().format()
            }
        };

        let apigClient = apigClientFactory.newClient({
            invokeUrl: 'https://6milz2rjp1.execute-api.eu-central-1.amazonaws.com/prod',
            accessKey: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretKey: process.env.REACT_APP_AWS_SECRET_KEY,
            region: 'eu-central-1'
        });

        return apigClient.invokeApi({}, '/events/' + city, "POST", additionalParams)
            .then(response =>
                dispatch(receiveEvents(city, response.data))
            )
    }
};