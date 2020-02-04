import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GGB from '../ggb.png'

class NavBar extends Component{
    logOut = () => {
        localStorage.removeItem('jwt')
        this.props.clearCurrentUser()
      }
    
    render(){

        const loggedIn = !!this.props.user.id
        return(
            
                <div className="header">
                    <img src={GGB} className="logo"></img>
                
                {loggedIn ? 
                    <Fragment >
                         <div className="rectangle-68"></div>
                        <NavLink to='/profile' exact className="rectangle-64">Profile</NavLink> 
                        <div className="rectangle-67" ></div>
                        <NavLink to="/" exact className="rectangle-63">Home</NavLink>
                        <div className="rectangle-69"></div>
                        <NavLink to="/" onClick={this.logOut} className="rectangle-65">Logout</NavLink>
                    </Fragment>
                    : 
                    <Fragment >
                         
                         <div className="rectangle-67" ></div>
                        <NavLink to="/" exact className="rectangle-63">Home</NavLink>
                       
                       
                       
                        <div className="rectangle-68"></div>
                        
                        <NavLink to="/login" exact className="rectangle-64">Login</NavLink>
                        <div className="rectangle-69"></div>
                        <NavLink to='/signup' exact className="rectangle-65">Sign Up</NavLink>
                    </Fragment>
                 }
                 </div>
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCurrentUser: () => dispatch({ type: "CLEAR_CURRENT_USER" })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)