import { useState } from "react";
import Swal from 'sweetalert2'

const FormTodo = ({addTodo}) => {
    const[todo, setTodo] = useState({
        title: "",
        description: "",
        state: "pending",
        priority: true
    })

    const {title, description, state, priority} = todo;

    //Get the Data
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Title and Description are mandatory!',
            })
            
        }

        addTodo({
            id: Date.now(),
            ...todo,
            state: state === 'complited'

        })

        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Todo added sucesfully',
        showConfirmButton: false,
        timer: 1500
})
    }

    // Other way to do it= onChange={(e) => setTodo({...todo, title: e.target.value})}
    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setTodo({
            ...todo,
            [name]: type === "checkbox" ? checked : value
        })
    }

    return(
    <div className="mx-auto col-10 col-md-8 col-lg-6">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add Something" className="form-control mb-2" name="title" value={title} onChange={handleChange}/>
            <textarea className="form-control mb-2" placeholder="Add Description" name="description" value={description} onChange={handleChange}></textarea>
            <div className="form-check">
                <input type="checkbox" name="priority" className="form-check-input" id="inputCheck" checked={priority} onChange={handleChange}/>
                <label htmlFor="inputCheck">Give Priority</label>
            </div>
            <select className="form-select mb-2" name="state" value={state} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="complited">Complited</option>
            </select>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default FormTodo;