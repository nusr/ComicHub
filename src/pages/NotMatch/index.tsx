import React from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';

type Props = {
  location: Location;
};

const NoMatch: React.FunctionComponent<Props> = ({
  location,
}) => {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <div>
        <Link to="/">Back To Home</Link>
      </div>
    </div>
  );
};

export default NoMatch;
