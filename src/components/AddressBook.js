import React, {useState, useEffect } from "react";
import AddOrganizations from "./OrganizationForm";
import AddPeople from "./PeopleForm";
import firebaseDB from '../firebase';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const Addresses = () => {
    const [key, setKey] = useState('home');


    var [contactValues, setContactValues] = useState([])
    var [organizationsValues, setOrganizationsValues] = useState([])
    var [currentId,setCurrentId] = useState('')


    useEffect(()=>{
        firebaseDB.child("Organizations").on('value',snapshot=>{
            const val = snapshot.val()
            if(val !== null) {
                let contacts = null
                firebaseDB.child("Contacts").orderByChild("organization").equalTo(val.organization).on('value',snapshot=>{
                    const val = snapshot.val()
                    if(val !== null) {
                        contacts = val
                        setContactValues(val)
                    }
                })
                setOrganizationsValues({
                    ...val,
                    contacts: contacts ?? []
                })
            }
        })
    },[])
    
    const formActionsOrganizations = object=>{
        if(currentId == '')
            firebaseDB.child("Organizations").push(
                object,
                error => {
                    if(error){
                        console.log(error);
                    }
                    else
                    setCurrentId('')
                }
            )
            else
            firebaseDB.child(`Organizations/${currentId}`).set(
                object,
                error => {
                    if(error){
                        console.log(error);
                    }else
                        setCurrentId('')
                }
            )
    }

    const formActionsContacts = object=>{
        if(currentId == '')
            firebaseDB.child("Contacts").push(
                object,
                error => {
                    if(error){
                        console.log(error);
                    }
                    else
                    setCurrentId('')
                }
            )
            else
            firebaseDB.child(`Contacts/${currentId}`).set(
                object,
                error => {
                    if(error){
                        console.log(error);
                    }else
                        setCurrentId('')
                }
            )
    }

    const onDeleteContacts = key =>{
        if(window.confirm('Warning! proceeding will delete this entry are your sure you want to continue?')){
            firebaseDB.child(`Contacts/${key}`).remove(
                error => {
                    if(error){
                        console.log(error);
                    }else
                        setCurrentId('');
                }
            )
        }

    }
    const onDeleteOrganizations = key =>{
        if(window.confirm('Warning! proceeding will delete this entry are your sure you want to continue?')){
            firebaseDB.child(`Organizations/${key}`).remove(
                error => {
                    if(error){
                        console.log(error);
                    }else
                        setCurrentId('');
                }
            )
        }

    }

    

    return (
        <div>
            <nav class="navbar navbar-dark bg-primary">
                <span class="navbar-brand justify-content-end">Navbar</span>
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a class="nav-link active" href="https://github.com/Laith-Kamaraldin/Administrate_InterviewProject#readme">ReadMe </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="https://github.com/Laith-Kamaraldin/Administrate_InterviewProject">GitHub Repo</a>
                    </li>
                </ul>
            </nav>
           
            <div className="container">
                <div className="row">
                <div className="col-md-4 col-md-offset-2 bg-light border rounded-3">
                
                <AddOrganizations {...({formActionsOrganizations,currentId,organizationsValues})}/>
                <AddPeople {...({formActionsContacts,currentId, contactValues})}/>
                
                </div>
                    <div className="col-md-8 col-md-offset-2 bg-light border rounded-3 ">

                    <div className="accoridian">
                <Accordion>
                    {
                        Object.keys(organizationsValues).map(id => {
                            const organization = organizationsValues[id]
                                        return <Card className="card" key={id}>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <table class="table2">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">{organization.organization}</th>
                                                    <th scope="col">{organization.mobile}</th>
                                                    <th scope="col">{organization.address}</th>
                                                    <th scope="col"><a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                                            <i className="fas fa-pencil-alt"/>
                                                        </a>
                                                        <a className="btn text-danger" onClick={()=> {onDeleteOrganizations(id)}}>
                                                            <i className="fas fa-trash-alt"/>
                                                        </a></th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>

                                                        <table className="table table-responsive table-sm table-borderless table-stripped">
                                                            <thead className="thead-light">
                                                        <tr>
                                                            <th>First Name</th>
                                                            <th>Last Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            <th>Organization</th>
                                                            <th>Address</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.keys(organization.contacts).map(id =>{
                                                                const contact = organization.contacts[id]
                                                                return <tr key={id}>
                                                                    <td>{contact.firstName}</td>
                                                                    <td>{contact.lastName}</td>
                                                                    <td>{contact.email}</td>
                                                                    <td>{contact.mobile}</td>
                                                                    <td>{contact.organization}</td>
                                                                    <td>{contact.address}</td>
                                                                    <td>
                                                                        <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                                                            <i className="fas fa-pencil-alt"/>
                                                                        </a>
                                                                        <a className="btn text-danger" onClick={()=> {onDeleteContacts(id)}}>
                                                                            <i className="fas fa-trash-alt"/>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                                })
                                                        }
                                                    </tbody>
                                                </table>


                                                </Card.Body>
                                            </Accordion.Collapse>
                                                
                                            </Card>
                        })}

                </Accordion>        


                    </div>
                </div>
                
                
  


                
                </div>                   


            </div>
      </div>
    );
}

export default Addresses;
