import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;

// function withFirebase(Component) {
//     return function (props) {
//         return(
//             <FirebaseContext.Consumer>
//                 { function (firebase) {return <Component {...props} firebase={firebase} />}}
//             </FirebaseContext.Consumer>)
//
//     }
// }
