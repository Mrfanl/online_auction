import React from 'react'
import {withRouter} from 'react-router-dom';


class AuthRoute extends React.Component{
  componentWillMount(){
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null;
     }else{
      var allcookies = document.cookie
      if(allcookies.indexOf('user=')==-1){
        this.props.history.push('/login');
      }

    }

   }
  render(){
    return null;
  }
}

AuthRoute = withRouter(AuthRoute)
export default AuthRoute
