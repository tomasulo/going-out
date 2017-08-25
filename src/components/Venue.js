import React from "react";

export const Venue = ({ name, street, zip, city }) =>
	<p className="venue">
		<b>{name}</b>
		<br />
		{street}
		<br />
		{zip}
		, {city}
	</p>;
