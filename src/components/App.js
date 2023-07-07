import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import React, {useEffect} from 'react';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/API';
import { Card } from './Card';
function App() {
    const [editPopupOpened, setEditPopupOpened] = React.useState(false)
    const [addPopupOpened, setaddPopupOpened] = React.useState(false)
    const [deletePopupOpened, setdeletePopupOpened] = React.useState(false)
    const [avatarPopupOpened, setavatarPopupOpened] = React.useState(false)
    const [fullImagePopupOpened, setfullImagePopupOpened] = React.useState(false)
    const [userName, setUserName] = React.useState()
    const [userDescription, setUserDescription] = React.useState()
    const [userAvatar, setUserAvatar] = React.useState()
    const [cards, setCards] = React.useState([{name:"name", link:"link", likes:[], _id: 0}])
    const [selectedCard, setSelectedCard] = React.useState()
    React.useEffect(() => {
        api.getUser().then((data) => {setUserName(data.name)}).catch(err => {console.log(err)})
      },[])
      React.useEffect(() => {
        api.getUser().then((data) => {setUserDescription(data.about)}).catch(err => {console.log(err)})
      },[])
      React.useEffect(() => {
        api.getUser().then((data) => {setUserAvatar(data.avatar)}).catch(err => {console.log(err)})
      },[])

      React.useEffect(() => {
        api.getCards().then((data) => {console.log(data);setCards(data);}).catch(err => {console.log(err)})
      }, []);
      console.log("cardsel",selectedCard)
  return (
    <>
    {editPopupOpened && <PopupWithForm buttonText={"Сохранить"} onClose={()=>{setEditPopupOpened(!editPopupOpened)}} popupTitle = {"Редактировать профиль"} formName={"Edit"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    
                </fieldset>
        
        </PopupWithForm>}
    {addPopupOpened && <PopupWithForm buttonText={"Создать"} onClose={()=>{setaddPopupOpened(!addPopupOpened)}} popupTitle = {"Новое место"} formName={"Add"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    
                </fieldset>
        
        </PopupWithForm>}
    {avatarPopupOpened && <PopupWithForm buttonText={"Сохранить"} onClose={()=>{setavatarPopupOpened(!avatarPopupOpened)}} popupTitle = {"Обновить аватар"} formName={"Avatar"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    
                </fieldset>
        
        </PopupWithForm>}
    {deletePopupOpened && <PopupWithForm popupTitle = {"Вы уверены?"} formName={"Delete"}>
                <fieldset id="editFields" className="popup__fields">
                    <button type="submit" className="popup__save" id="popupEditSave">Да</button>
                </fieldset>
        </PopupWithForm>}
        {fullImagePopupOpened && <ImagePopup card={selectedCard} onClose={()=>{setfullImagePopupOpened(!fullImagePopupOpened)}}></ImagePopup>}


    <Header/>
    <Main userAvatar={userAvatar} userDescription={userDescription} userName={userName} onAddPopupOpen={()=>{setaddPopupOpened(!addPopupOpened)}} onEditPopupOpen={()=>{setEditPopupOpened(!editPopupOpened)}} onAvatarPopupOpen={()=>{setavatarPopupOpened(!avatarPopupOpened)}} >
        {cards.map((item) => {return(<Card card={item} key={item._id} clickHandler={()=>{setSelectedCard(item);setfullImagePopupOpened(!fullImagePopupOpened)}} />)})}
    </Main>
    <Footer/>
    
</>
  );
}

export default App;
