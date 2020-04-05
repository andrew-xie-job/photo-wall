import React, {Component} from 'react'
import PhotoWall from './PhotoWall'
import AddPhoto from './AddPhoto'
import {Route, Switch} from 'react-router-dom'
import Single from './Single'
import SignIn from './SignIn'
import SignUp from './SignUp'
import PasswordReset from './PasswordReset'
import Landing from './Landing'
import {withAuthentication} from './Session';
import Navigation from "./Navigation";

class Main extends Component {

    state = {loading: true};

    componentDidMount() {
        this.props.startLoadingPost().then(() => {
            this.setState({loading: false})
        });
        this.props.startLoadingComments()
    }


    render() {
        return (
            <div>
                <h1>PhotoWall</h1>
                        <div>
                            <Navigation/>

                            <hr/>

                            <Switch>
                                <Route path="/SignIn" component={SignIn}/>
                                <Route path="/SignUp" component={SignUp}/>
                                <Route path="/PasswordReset" component={PasswordReset}/>
                                <Route exact path="/" component={Landing}/>
                                <Route path="/PhotoWall" render={() => (
                                    <div>
                                        <PhotoWall {...this.props} />
                                    </div>

                                )}/>

                                <Route path="/Account" component={Landing}/>

                                <Route path="/addPhoto" render={({history}) => (
                                    <AddPhoto {...this.props} onHistory={history}/>
                                )}/>

                                <Route exact path="/single/:id" render={(params) => (
                                    <Single loading={this.state.loading} {...this.props} {...params}/>
                                )}/>

                            </Switch>

                        </div>
            </div>
    )
    }

    }

    export default withAuthentication(Main)
