import React from 'react'
import { useForm } from 'react-hook-form'
import { Accommodation } from '../../Types/AccommodationTypes';

const AddAccommodationForm = () => {
const {register, handleSubmit, errors} = useForm<Accommodation>()

const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data))
})
const formStyle = {
    backgroundColor: '#fff'
}
return (
        <main>
        <form onSubmit={onSubmit} style={formStyle}>
        <div>
            <label htmlFor="address">Address</label>
            <input ref={register({ required: true })} id="address" name="address" type="text"/>
            {
            errors.address && <div className="error">Enter address</div>
            }
        </div>
        <div>
            <label htmlFor="name">Name</label>
            <input ref={register({ required: true })} id="name" name="name" type="text"/>
            {
            errors.name && <div className="error">Enter name</div>
            }
        </div>
        <div>
            <label htmlFor="website">Website</label>
            <input ref={register({ required: true })} id="website" name="website" type="text"/>
            {
            errors.website && <div className="error">Enter website</div>
            }
        </div>
        <div>
            <label htmlFor="number">Number</label>
            <input ref={register({ required: true })} id="number" name="number" type="text"/>
            {
            errors.number && <div className="error">Enter number</div>
            }
        </div>
        <button type="submit">Save</button>
        </form>
        </main>
    );
}

export default AddAccommodationForm;