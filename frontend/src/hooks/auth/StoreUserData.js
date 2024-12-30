import React from 'react'

const StoreUserData = async (formData) => {

    try{
        const response = await fetch('http://localhost:5000/auth/signup',{
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/json' },
          })
          return response;
    }catch(error){
        return error;
    }
   

    
}

export default StoreUserData;