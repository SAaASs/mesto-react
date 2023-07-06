import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import React, {useEffect} from 'react';
import { FullImagePopup } from './ImagePopup';
import { api } from '../utils/API';
import { LeCard } from './Card';
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
        api.getUser().then((data) => {setUserName(data.name)})
      },[])
      React.useEffect(() => {
        api.getUser().then((data) => {setUserDescription(data.about)})
      },[])
      React.useEffect(() => {
        api.getUser().then((data) => {setUserAvatar(data.avatar)})
      },[])

      React.useEffect(() => {
        api.getCards().then((data) => {console.log(data);setCards(data);})
      }, []);
      console.log("cardsel",selectedCard)
  return (
    <>
    {editPopupOpened && <PopupWithForm onClose={()=>{setEditPopupOpened(!editPopupOpened)}} popupTitle = {"Редактировать профиль"} formName={"Edit"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    <button type="submit" className="popup__save" id="popupEditSave">Сохранить</button>
                </fieldset>
        
        </PopupWithForm>}
    {addPopupOpened && <PopupWithForm onClose={()=>{setaddPopupOpened(!addPopupOpened)}} popupTitle = {"Новое место"} formName={"Add"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    <button type="submit" className="popup__save" id="popupEditSave">Создать</button>
                </fieldset>
        
        </PopupWithForm>}
    {avatarPopupOpened && <PopupWithForm onClose={()=>{setavatarPopupOpened(!avatarPopupOpened)}} popupTitle = {"Обновить аватар"} formName={"Avatar"}>
                <fieldset id="editFields" className="popup__fields">
                    <div  className="popup__input-container">
                        <input name="name_input" className="popup__input" id="popupName" noValidate minLength="2" maxLength="40" required/>
                        <span className="popupName-error popup__error"></span>
                    </div>
                    <div className="popup__input-container">
                        <input name="work_input" className="popup__input" id="popupWork" noValidate minLength="2" maxLength="400" required/>
                        <span className="popupWork-error popup__error"></span>
                    </div>
                    <button type="submit" className="popup__save" id="popupEditSave">Сохранить</button>
                </fieldset>
        
        </PopupWithForm>}
    {deletePopupOpened && <PopupWithForm popupTitle = {"Вы уверены?"} formName={"Delete"}>
                <fieldset id="editFields" className="popup__fields">
                    <button type="submit" className="popup__save" id="popupEditSave">Да</button>
                </fieldset>
        </PopupWithForm>}
        {fullImagePopupOpened && <FullImagePopup imgUrl={selectedCard.link} onClose={()=>{setfullImagePopupOpened(!fullImagePopupOpened)}}></FullImagePopup>}


    <Header/>
    <Main userAvatar={userAvatar} userDescription={userDescription} userName={userName} onAddPopupOpen={()=>{setaddPopupOpened(!addPopupOpened)}} onEditPopupOpen={()=>{setEditPopupOpened(!editPopupOpened)}} onAvatarPopupOpen={()=>{setavatarPopupOpened(!avatarPopupOpened)}} >
        {cards.map((item) => {return(<LeCard card={item} clickHandler={()=>{setSelectedCard(item);setfullImagePopupOpened(!fullImagePopupOpened)}} />)})}
    </Main>
    <Footer/>
    
</>
  );
}

export default App;
