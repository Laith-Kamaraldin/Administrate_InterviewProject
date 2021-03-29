import React,{useState,useEffect} from "react";

const AddOrganizations = (props) => {
    const values = {
        organization: "",
        mobile: "",
        address: ""   
    }

    var [fieldValues,setFieldValues] = useState(values);

    useEffect(() => {
        if(props.currentId=='')
            setFieldValues({
                ...values
            })
        else
            setFieldValues({
                ...props.organizationsValues[props.currentId]
             })
    }, [props.currentId, props.organizationsValues])


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



    return (
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
            <input type="submit" value={props.currentId == '' ? "Add Organzation":"Update Organization"} className="btn btn-primary btn-block"/>
        </div>

        </form>
    );
}

export default AddOrganizations;