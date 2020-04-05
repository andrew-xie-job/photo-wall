import React from 'react';

import { withFirebase } from './Firebase';

const SignOut = ({ firebase }) => (
    <button type="button" className="bg-green-400 hover:bg-green-500 w-full py-2 text-white" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOut);
