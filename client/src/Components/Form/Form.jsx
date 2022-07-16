import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog, deleteDog } from '../../Redux/Actions';
import styles from './Form.module.css'

export function Form() {
    const dispatch = useDispatch();
    const temps = useSelector(state => state.temps);

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    const [disable, setDisable] = useState(true);
    const [formInput, setFormInput] = useState({
       name: "",
       image: "",
       years: 0,
       heightMin: 0,
       heightMax: 0,
       weightMin: 0,
       weightMax: 0,
       temperaments: []
    });

    const [errors, setErrors] = useState({});

    //regExp to control form
    const regExp = {
        name: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\-., ]{5,30}$/,
        image:  /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
        years: /^[1-9][0-9]?$/g
    }

    // error alerts
    const alerts = {
        name: "Name between 5 and 30 characters",
        image: "Insert an URL ",
        weight: "Weight is in Kilograms",
        height: "Height is in centimeters",
        years: "Years of life",
        temperaments: "Select at least one temperament"
    }

    // validation
    function validate (value){ // value is the object with inputs ---> {}
        let errors = {};
        
            if(!regExp.name.test(value.name)){ // --> if value does not meet this condition... then
                errors.name = alerts.name;
            }
            if(!regExp.image.test(value.image) ){
                errors.image = alerts.image;
            }
            if(!regExp.years.test(value.years)){
                errors.years = alerts.years;
            }
            if(value.temperaments.length <= 0 ){
                errors.temperaments = "Select at least one temperament";
            }
            
        return errors; // --> errors is an object whose value will be assigned to the state errors 
        }

    
    function handleInputChange (e) {
        e.preventDefault();
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate ({
            ...formInput,
            [e.target.name]: e.target.value
            })
        )
        setDisable(false)
    }

    function handleSubmit(e){
        e.preventDefault();
        let formData = {
            temperaments: formInput.temperaments,
            name: formInput.name,
            image: formInput.image,
            years: formInput.years,
            height: `${formInput.heightMin} - ${formInput.heightMax}`,
            weight: `${formInput.weightMin} - ${formInput.weightMax}`,
        };
        console.log(formData)
        dispatch(postDog(formData))
        alert("DOG CREATED")
        setFormInput({
            name: "",
            image: "",
            years: 0,
            heightMin: 0,
            heightMax: 0,
            weightMin: 0,
            weightMax: 0,
            temperaments: []
        })
        setDisable(true)
    }

    function handleSelect (e){
        e.preventDefault();
        setFormInput({
            ...formInput,
            temperaments: [...formInput.temperaments, e.target.value]
        })
        setErrors(
            validate ({
            ...formInput,
            temperaments: [...formInput.temperaments, e.target.value]
            })
        )
    }

    function deleteSelectedTemp(value){
        setFormInput({
            ...formInput,
            temperaments: [...formInput.temperaments.filter(e => {return e !== value})]
        })
        setErrors(
            validate ({
            ...formInput,
            temperaments: [...formInput.temperaments.filter(e => {return e !== value})]
            })
        )
    }

    

    return (
        <div>
            <h1>CREATE YOUR DOG</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor = "name" >Name: </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formInput.name}
                            onChange={handleInputChange}
                            placeholder="Dog name"
                            autoComplete='off'
                            // required
                        />
                        <br/>
                </div>
                <div>
                    {errors.name ? <span className={styles.errors}>{errors.name}</span>: null}
                </div>

                <div>
                    <label htmlFor = "image" >Image: </label>
                    <input 
                        id="image"
                        type="text"
                        name="image"
                        value={formInput.image}
                        onChange={handleInputChange}
                        placeholder="Ex: https://example.com/photo.jpg"
                        autoComplete='off'
                    />
                    <br/>
                </div>
                <div>
                     {errors.image ? <span className={styles.errors}>{errors.image}</span>: null}
                </div>

                <div>
                    <label htmlFor = "years" >Years: </label>
                    <input 
                        id="years"
                        type="number"
                        name="years"
                        value={formInput.years}
                        onChange={handleInputChange}
                        placeholder="Years"
                        autoComplete='off'
                        min={1}
                        max={99}
                    />
                    <br/>
                </div>
                <div>
                     {errors.years ? <span className={styles.errors}>{errors.years}</span>: null}
                </div>

                <div>
                    <label htmlFor = "heightMin" >Minimum Height: </label>
                    <input 
                        id="heightMin"
                        type="range"
                        name="heightMin"
                        min={0}
                        max={100}
                        value={formInput.heightMin}
                        onChange={handleInputChange}/>
                    <span>{formInput.heightMin}</span>
                    <span> cm.</span>
                    <br/>
                </div>

                <div>
                    <label htmlFor = "heightMax" >Maximum Height: </label>
                    <input 
                        id="heightMax"
                        type="range"
                        name="heightMax"
                        min={0}
                        max={100}
                        value={formInput.heightMax}
                        onChange={handleInputChange}/>
                    <span>{formInput.heightMax}</span>
                    <span> cm.</span>
                    <br/>
                </div>


                <div>
                    <label htmlFor = "weightMin" >Minimum Weight: </label>
                    <input 
                        id="weightMin"
                        type="range"
                        name="weightMin"
                        min={0}
                        max={100}
                        value={formInput.weightMin}
                        onChange={handleInputChange}/>
                    <span>{formInput.weightMin}</span>
                    <span> Kg.</span>
                    <br/>
                </div>

                <div>
                    <label htmlFor = "weightMax" >Maximum Weight: </label>
                    <input 
                        id="weightMax"
                        type="range"
                        name="weightMax"
                        min={0}
                        max={100}
                        value={formInput.weightMax}
                        onChange={handleInputChange}/>
                    <span>{formInput.weightMax}</span>
                    <span> Kg.</span>
                    <br/>
                </div>


                <div>
                    <label htmlFor = "temps" >Select temperaments: </label>
                    <select name= "temps" id="temps" onChange={ handleSelect}>
                        {temps.map(e => 
                            (<option value={e.name}>{e.name}</option>)
                            )}
                    </select>
                    <br/>
                </div>
                    <div>
                    {errors.temperaments ? <span className={styles.errors}>{errors.temperaments}</span>: null}
                    </div>
                <div className={styles.selected}>
                    {
                            formInput.temperaments.map((t) => (
                                <div className={styles.containerType}>
                                    <span className={styles.close} onClick={() => deleteSelectedTemp(t)}>X</span>
                                    <p>{t}</p>
                                </div>
                            )
                        )
                    }
                </div>
                
                    
                

                <button type="submit" name="submit"
                        disabled = {disable === false && Object.entries(errors).length === 0 ? false: true}>CREATE DOG  
                </button>

                </form>
        </div>
    )
}
