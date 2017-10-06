import React from "react";

export const Venue = ({name, street, zip, city}) => (
    <p>
        <b>{name}</b>
        <br/>{street}<br/>
        {zip}, {city === 'Munich' ? 'München' : city}
    </p>
);