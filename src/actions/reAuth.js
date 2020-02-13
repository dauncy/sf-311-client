const reAuth =(history)=>{
    console.log(history)
    return(dispatch) => {
        return fetch("http://localhost:3000/profile", {
            method: "POST",
            headers: {
             "Content-type": "application/json",
             'Accept': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
       
          }).then(response => response.json())
          .catch((error) => {
            
            if (error) {
            console.log("turn on your server")
          }
          else {
          return window.alert("Oh my. Something has gone terribly wrong.")
          }
        }).then(json => { if(json.user !== undefined){
          console.log(json.user.included)
            dispatch({type: "RE_AUTH", user: json.user.data.attributes})
            dispatch({type: "SET_USER_EVENTS", userEvents: json.user.included.map(issue => issue.attributes)})
        } else{console.log("sup bro")}})
        
        .catch((error) => {
            console.log(error)
          })
          
        
            
      
    }
}
//  dispatch({ type: "SET_CURRENT_USER", user: json.user.data.attributes })

export default reAuth