import { PopupWithForm } from "./PopupWithForm"
import React from "react"
export function EditPopup({onClose, submitHandler, isOpen}) {
    const [workValue, setWorkValue] = React.useState("")
    const [nameValue, setNameValue] = React.useState("")
    function handleNameChange(e) {
        setNameValue(e.target.value);
      }
    function handleWorkChange(e) {
        setWorkValue(e.target.value);
    }
    return (
        <PopupWithForm isOpen={isOpen} buttonText={"Сохранить"} submitHandler={ (e)=>{e.preventDefault();submitHandler(nameValue, workValue)} } onClose={onClose} popupTitle = {"Редактировать профиль"} formName={"Edit"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input onChange={handleNameChange} name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div onChange={handleWorkChange} className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    
                </fieldset>
        
        </PopupWithForm>
    )
}