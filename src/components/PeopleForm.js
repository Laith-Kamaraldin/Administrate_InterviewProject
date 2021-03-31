import React,{useState,useEffect} from "react";

const AddPeople = (props) => {
    const defaultValues = {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        organization: "",
        address: ""
        
    }

    var [fieldValues,setFieldValues] = useState(defaultValues);

    useEffect(() => {
        if(props.currentId=='')
            setFieldValues({
                ...defaultValues
            })
        else
            setFieldValues({
                ...props.contacts[props.currentId]
             })
    }, [props.currentId, props.contacts])


    const handleInputChange = e =>{
        var{name, value} = e.target
        setFieldValues({
            ...fieldValues,
            [name]:value
        })
    }

    const handleFormSubmit = e =>{
        e.preventDefault();
        props.formActionsContacts(fieldValues)
    }
  

    return ( 
        <div>  
        <h5 class="formHeader">Add Contact</h5>
        <form autoComplete = "off" onSubmit={handleFormSubmit}>
                   
            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="First Name"  name="firstName" value={fieldValues.firstName} onChange={handleInputChange}/> 
            </div>


            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="Last Name"  name="lastName" value={fieldValues.lastName} onChange={handleInputChange}/> 
            </div>

            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="Email"  name="email" value={fieldValues.email} onChange={handleInputChange}/> 
            </div>
            
            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="Mobile No"  name="mobile" value={fieldValues.mobile} onChange={handleInputChange}/> 
            </div>

            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="Organization Name"  name="organization" value={fieldValues.organization} onChange={handleInputChange}/> 
            </div>

            <div className="input-group mb-3">
                <textarea  type="text"  className="form-control" placeholder="Address"  name="address" value={fieldValues.address} onChange={handleInputChange}/> 
            </div>    

            <div className="form-group">
            <input type="submit" value={props.currentId == '' ? "Add Contact":"Update Contact"} className="btn btn-primary btn-block"/>
        </div>
        
            
        </form>
        </div>
    );
}

export default AddPeople;