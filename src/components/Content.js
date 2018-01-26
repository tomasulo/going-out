import React from 'react'
import {EventContainer} from "../containers/EventContainer";

// TODO think about how to do this differently
// e.g. Have one component for each city to be able to style them differently
export const Content = () => {
    return (
        <div>
            <EventContainer/>
        </div>
    )
};
