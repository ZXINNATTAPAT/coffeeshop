import React, { useContext } from 'react';
import { UserContext } from './usercontext';



const DashboardPage = () => {
    const { user } = useContext(UserContext);
  
    // if (!user) {
    //     console.log(user)
    //   return <div>Loading...</div>;
    // }
  
    return (
      <div>
        <h1>{`Hello ${user.Tel}!`}</h1>
        
      </div>
    );
  };
  
  export default DashboardPage;
  
