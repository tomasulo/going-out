import React from "react";

export const Venue = ({name, street, zip, city}) => (
    <div>
        <p><strong>{name}</strong><br/>
            {street}<br/>
            {zip}, {city === 'Munich' ? 'München' : city}</p>
    </div>
);