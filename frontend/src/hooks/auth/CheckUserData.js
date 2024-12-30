

const CheckUserData = async (formData) => {

    try{
        const response = await fetch('http://localhost:5000/auth/signin',{
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/json' },
          })
          return response;
    }catch(error){
        return error;
    }
   

}

export default CheckUserData;