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
        firebaseDB.child("Contacts").on('value',snapshot=>{
            if(snapshot.val()!= null)
            setContactValues({
                ...snapshot.val()
            })
            else{
                setContactValues({
                    ...snapshot.val()
                })
            }
        })
    },[])

    useEffect(()=>{
        firebaseDB.child("Organizations").on('value',snapshot=>{
            if(snapshot.val()!= null)
            setOrganizationsValues({
                ...snapshot.val()
            })
            else{
                setOrganizationsValues({
                    ...snapshot.val()
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
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1">Navbar</span>
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">ReadMe </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">GitHub Repo</a>
                    </li>
                </ul>
            </nav>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Administrate Address Book</h1>
                    <p className="lead text-center">Project made for the Administrate technincal challange.</p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-md-4 col-md-offset-2 bg-light border rounded-3">
                <Tabs
                    id="form-tabs"
                    defaultActiveKey="addOrganization"
                    activeKey = {key}
                    onSelect= {(k) => setKey(k)}
                >
                    <Tab eventKey = "addPeople" title = "Add Contact">
                        <AddPeople {...({formActionsContacts,currentId,contactValues})}/>
                    </Tab>
                    <Tab eventKey = "addOrganization" title = "Add Organization">
                        <AddOrganizations {...({formActionsOrganizations,currentId,organizationsValues})}/>
                    </Tab>
                </Tabs>
                  
                </div>
                    <div className="col-md-8 col-md-offset-2 bg-light border rounded-3 ">

                    <div className="accoridian">
                <Accordion>
                    {
                        Object.keys(organizationsValues).map(id =>{
                                        return <Card className="card" key={id}>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <div className="organizationContent">
                                            <p>{organizationsValues[id].organization}</p>
                                            <p>{organizationsValues[id].mobile}</p>
                                            <p>{organizationsValues[id].address}</p>
                                            
                                                <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                                    <i className="fas fa-pencil-alt"/>
                                                </a>
                                                <a className="btn text-danger" onClick={()=> {onDeleteOrganizations(id)}}>
                                                    <i className="fas fa-trash-alt"/>
                                                </a>
                                            </div>
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
                                                            Object.keys(contactValues).map(id =>{
                                                                return <tr key={id}>
                                                                    <td>{contactValues[id].firstName}</td>
                                                                    <td>{contactValues[id].lastName}</td>
                                                                    <td>{contactValues[id].email}</td>
                                                                    <td>{contactValues[id].mobile}</td>
                                                                    <td>{contactValues[id].organization}</td>
                                                                    <td>{contactValues[id].address}</td>
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