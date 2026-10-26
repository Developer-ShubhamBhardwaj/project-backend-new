class apierror extends Error{
    constructor(
        statuscode , 
        message="something went wrong",
         errors=[],
         stack=""
    ){super(message),
    this.statuscode = statuscode,
    this.errors= errors,
    this.data = null,
    this.success = false
    }


}
export {apierror}