import {useState} from 'react';
import {
    Container,
    Button,
    Modal,
    Form,
    Table,
} from "react-bootstrap";
const Users = () => {


const [modalState,changemodalState] = useState(false);

const [formState,changeformState] = useState([]);

const [input,setInput] = useState({
    name: '',
    email: '',
    mobile: ''
});

const [submit,changeSubmit] = useState(true);

const allData = {};


const getData = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    for(let data of formData.entries()) {
        let key = data[0];
        let value = data[1];
        if(typeof value === 'object'){
            value = URL.createObjectURL(value);
        }
        allData[key] = value;
    }
   
}

const setInputValue = (e) =>{
    const input = e.target;
    const name = input.name;
    const value = input.value;
    return setInput((oldData) =>{
           return {
               ...oldData,
               [name]: value
           }
    });
}

const removeTr = (index) =>{
    const tmp = [...formState];
    tmp.splice(index, 1);
    return changeformState(tmp);
}

const editUser = (data)=>{
    let index = data.index;
    sessionStorage.setItem('rowIndex',index);
    return (
      setInput(data),
      changeSubmit(false),
      changemodalState(true)
    );
}

  const closeModal = ()=>{
    return (
        changemodalState(false),
        changeSubmit(true)
    );
}

const insert = (e)=>{
    getData(e);
    return (
        changeformState((oldData) => {
        return[
            ...oldData,allData
        ]
    }),
    changemodalState(false),
        setInput({
            name: '',
            email: '',
            mobile: ''
        })
    );
}

const update = (e)=>{
    getData(e);
    console.log(allData);
    let index = sessionStorage.getItem('rowIndex');
    let tmp = [...formState];
    tmp[index] = allData;
    return (
        changeformState(tmp),
        changemodalState(false),
        setInput(tmp),
        changeSubmit(true)
    );
}


const Tr = (data)=>{
    
    return (
        <>
           <tr>
               <td>{data.userData.index+1}</td>

               <td><img src={data.userData.picture} alt="imgaa" style={{width:"50px"}}/></td>

               <td>{data.userData.name}</td>

               <td>{data.userData.email}</td>

               <td>{data.userData.mobile}</td>

               <td>{new Date().toLocaleString()}</td>

               <td>
                   <Button style={{marginRight:"5px"}} className="badge" variant="info" onClick={()=>editUser(data.userData)}><i className="fa fa-edit">Edit</i></Button>
                   <Button className="badge" variant="danger" onClick={()=>removeTr(data.userData.index)}><i className="fa fa-trash">Delete</i></Button>

               </td>
           </tr>
        </>
    );
}

    return (
        <div>
            <Container className="py-4">
                <h1 className="display-4 text-center mb-4">Users</h1>
                <Button onClick={()=>changemodalState(true)} className="btn rounded-circle add-btn"><i className="fa fa-plus"></i></Button>
                <Modal show={modalState} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={submit ? insert : update}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={input.name} onChange={setInputValue}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={input.email} onChange={setInputValue}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="mobile" name="mobile" value={input.mobile} onChange={setInputValue}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Picture</Form.Label>
                            <Form.Control type="file" name="picture" accept="image/*" />
                        </Form.Group>
                        {
                            submit ? <Button className="mt-2" type="submit" varient="danger">Submit</Button> : <Button className="mt-2" type="submit" varient="warning">Update</Button>
                        }
                    
                    </Form>
                 
                </Modal.Body>
                </Modal>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>S/NO</th>
                        <th>Picture</th>
                        <th>FirstName</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                         formState.map((item,index)=>{
                             item['index'] = index;
                             return <Tr key={index} userData={item}/>
                         })
                         }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Users;
