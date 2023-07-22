import logo from './logo.svg';
import './App.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { AddPopup } from './AddPopup';
import React, {useEffect} from 'react';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/API';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AvatarPopup } from './AvatarPopup';
import { EditPopup } from './EditPopup';
function App() {
    const [currentUser, setCurrentUser] = React.useState()
    const [editPopupOpened, setEditPopupOpened] = React.useState(false)
    const [addPopupOpened, setaddPopupOpened] = React.useState(false)
    const [deletePopupOpened, setDeletePopupOpened] = React.useState(false)
    const [avatarPopupOpened, setavatarPopupOpened] = React.useState(false)
    const [fullImagePopupOpened, setfullImagePopupOpened] = React.useState(false)
    const [cards, setCards] = React.useState([{name:"name", link:"link", likes:[], _id: 0}])
    const [selectedCard, setSelectedCard] = React.useState()
    React.useEffect(() => {
        api.getUser().then((data) => {setCurrentUser(data);}).catch(err => {console.log(err)})
      },[])

      React.useEffect(() => {
        api.getCards().then((data) => {console.log(data);setCards(data);}).catch(err => {console.log(err)})
      }, []);

      function handleCardLike(card) {
        const isLiked = card?.likes?.some(i => i._id === currentUser?._id);
        api.updateLike(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });

    } 
    function handleCardDelete(card) {

        console.log(card)
        api.deleteCard(card._id)
    } 
    function updateAvatar(link) {
       return api.updateAvatar(link)
    }
    function updateProfile(personName, personWork) {
        return api.updateProfile(personName, personWork)
    } 
     
    function updateCards(newPlaceName, newPlaceImgLink) {
       return api.sendCard(newPlaceName, newPlaceImgLink).then((value)=>{setCards([value, ...cards]); })
    }
  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    {editPopupOpened && <EditPopup submitHandler={(personName, personWork)=>{updateProfile(personName, personWork).then((value)=>{setCurrentUser(value); setEditPopupOpened(!editPopupOpened)})}} onClose={()=>{setEditPopupOpened(!editPopupOpened)}}></EditPopup>}
    {addPopupOpened && <AddPopup onClose={()=>{setaddPopupOpened(!addPopupOpened)}} submitHandler={(newPlaceName, newPlaceImgLink)=>{updateCards(newPlaceName, newPlaceImgLink).then(setaddPopupOpened(!addPopupOpened))}}></AddPopup>}
    {avatarPopupOpened && <AvatarPopup submitHandler={(link)=>{updateAvatar(link).then((value)=>{setCurrentUser(value); setavatarPopupOpened(!avatarPopupOpened)})}} onClose={()=>{setavatarPopupOpened(!avatarPopupOpened)}}></AvatarPopup>}
    {deletePopupOpened && <PopupWithForm submitHandler={(e)=>{e.preventDefault();handleCardDelete(selectedCard); setDeletePopupOpened(!deletePopupOpened); setCards(cards.filter(card => card != selectedCard))}}  onClose={()=>{setDeletePopupOpened(!deletePopupOpened)}} buttonText={"Да"} popupTitle = {"Вы уверены?"} formName={"Delete"}>
                <fieldset id="editFields" className="popup__fields">
                </fieldset>
        </PopupWithForm>}
        {fullImagePopupOpened && <ImagePopup card={selectedCard} onClose={()=>{setfullImagePopupOpened(!fullImagePopupOpened)}}></ImagePopup>}

    
        <Header/>
        <Main onAddPopupOpen={()=>{setaddPopupOpened(!addPopupOpened)}} onEditPopupOpen={()=>{setEditPopupOpened(!editPopupOpened)}} onAvatarPopupOpen={()=>{setavatarPopupOpened(!avatarPopupOpened)}} >
            {cards.map((item) => {return(<Card onDeletePopupOpen={()=>{setSelectedCard(item);setDeletePopupOpened(!deletePopupOpened)}} card={item} key={item._id} likeHandler={()=>{handleCardLike(item)}} clickHandler={()=>{setSelectedCard(item);setfullImagePopupOpened(!fullImagePopupOpened)}} />)})}
        </Main>
        <Footer/>
    </CurrentUserContext.Provider>

    
</>
  );
}

export default App;
