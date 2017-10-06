import {connect} from 'react-redux'
import moment from 'moment';
import EventList from '../components/event/EventList'
import {ALL, DATE_FILTER_FORMAT, NEXT_WEEKEND, TODAY, TOMORROW} from "../components/header/DateSelector";

const tomorrow = moment.utc().add(1, 'days').format(DATE_FILTER_FORMAT);
const today = moment.utc().format(DATE_FILTER_FORMAT);
const nextFri = moment.utc().day(5).format(DATE_FILTER_FORMAT);
const nextSat = moment.utc().day(6).format(DATE_FILTER_FORMAT);
const nextSun = moment.utc().day(7).format(DATE_FILTER_FORMAT);

const getVisibleEvents = (textFilter, dateFilter, events) => {

    let filteredEvents = events;

    switch (dateFilter) {
        case ALL:
            break;

        case TODAY:
            filteredEvents = events.filter(event => {
                return (
                    moment.utc(event.startTime).format(DATE_FILTER_FORMAT) === today
                );
            });
            break;

        case TOMORROW:
            filteredEvents = events.filter(event => {
                return (
                    moment.utc(event.startTime).format(DATE_FILTER_FORMAT) === tomorrow
                );
            });
            break;

        case NEXT_WEEKEND:
            let eventsOnFri = events.filter(event => {
                return moment.utc(event.startTime).format(DATE_FILTER_FORMAT) === nextFri
            });
            let eventsOnSat = events.filter(event => {
                return moment.utc(event.startTime).format(DATE_FILTER_FORMAT) === nextSat
            });
            let eventsOnSun = events.filter(event => {
                return moment.utc(event.startTime).format(DATE_FILTER_FORMAT) === nextSun
            });
            filteredEvents = eventsOnFri.concat(eventsOnSat, eventsOnSun);
            break;

        default:
            break;
    }

    if (!textFilter) {
        return filteredEvents;
    }

    return filteredEvents.filter(event => {
        return (
            event.description.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1
            || event.name.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1
            || event.venue.name.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1                );
    });
}

const mapStateToProps = state => {
    return {
        events: state.isFetching ? state.items : getVisibleEvents(state.textFilter, state.dateFilter, state.items),
        isFetching: state.isFetching
    };
};

export const EventContainer = connect(mapStateToProps)(EventList);

