import React,{useState,useEffect} from "react";

const AddOrganizations = (props) => {
    const values = {
        organization: "",
        mobile: "",
        address: ""   
    }

    var [fieldValues,setFieldValues] = useState(values);

    //method for filling form with old values to update.
    useEffect(() => {
        if(props.currentId=='')
            setFieldValues({
                ...values
            })
        else
            setFieldValues({
                ...props.organizations[props.currentId]
             })
    }, [props.currentId, props.organizations])


    const handleInputChange = e =>{
        var{name, value} = e.target
        setFieldValues({
            ...fieldValues,
            [name]:value
        })
    }

    const handleFormSubmit = e =>{
        e.preventDefault();
        props.formActionsOrganizations(fieldValues)
    }


    //form for organisations
    return (
        <div>
        <h5 class="formHeader">Add Organization</h5>
        <form autoComplete = "off" onSubmit={handleFormSubmit}>

            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="Organization Name"  name="organization" value={fieldValues.organization} onChange={handleInputChange}/> 
            </div>

            <div className="input-group mb-3">
                <input  type="text"  className="form-control" placeholder="Organization Contact No"  name="mobile" value={fieldValues.mobile} onChange={handleInputChange}/> 
            </div>

            <div className="input-group mb-3">
                <textarea  type="text"  className="form-control" placeholder="Organization Address"  name="address" value={fieldValues.address} onChange={handleInputChange}/> 
            </div>    

            <div className="form-group">
            <input type="submit" value={props.currentId == '' ? "Submit Organzation":"Update Organization"} className="btn btn-primary btn-block"/>
        </div>

        </form>
        </div>
    );
}

export default AddOrganizations;