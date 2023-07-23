import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { PopupWithForm } from "./PopupWithForm";
import { AddPopup } from "./AddPopup";
import React, { useEffect } from "react";
import { ImagePopup } from "./ImagePopup";
import { api } from "../utils/API";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AvatarPopup } from "./AvatarPopup";
import { EditPopup } from "./EditPopup";
function App() {
  const [currentUser, setCurrentUser] = React.useState({
    about: "placeholder",
    avatar: "placeholder",
    cohort: "placeholder",
    name: "placeholder",
    _id: "placeholder",
  });
  const [editPopupOpened, setEditPopupOpened] = React.useState(false);
  const [doomedCard, setDoomedCard] = React.useState("");
  const [addPopupOpened, setaddPopupOpened] = React.useState(false);
  const [avatarPopupOpened, setavatarPopupOpened] = React.useState(false);
  const [cards, setCards] = React.useState([
    { name: "name", link: "link", likes: [], _id: 0 },
  ]);
  const [selectedCard, setSelectedCard] = React.useState("");
  React.useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove("no-transition");
    }, 1000);
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card?.likes?.some((i) => i._id === currentUser?._id);
    api
      .updateLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).catch((err) => {
      console.log(err);
    });
  }
  function updateAvatar(link) {
    return api.updateAvatar(link).catch((err) => {
      console.log(err);
    });
  }
  function updateProfile(personName, personWork) {
    return api.updateProfile(personName, personWork).catch((err) => {
      console.log(err);
    });
  }

  function updateCards(newPlaceName, newPlaceImgLink) {
    return api
      .sendCard(newPlaceName, newPlaceImgLink)
      .then((value) => {
        setCards([value, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <EditPopup
          isOpen={editPopupOpened}
          submitHandler={(personName, personWork) => {
            updateProfile(personName, personWork).then((value) => {
              setCurrentUser(value);
              setEditPopupOpened(!editPopupOpened);
            });
          }}
          onClose={() => {
            setEditPopupOpened(!editPopupOpened);
          }}
        ></EditPopup>
        <AddPopup
          isOpen={addPopupOpened}
          onClose={() => {
            setaddPopupOpened(!addPopupOpened);
          }}
          submitHandler={(newPlaceName, newPlaceImgLink) => {
            updateCards(newPlaceName, newPlaceImgLink).then(
              setaddPopupOpened(!addPopupOpened)
            );
          }}
        ></AddPopup>
        <AvatarPopup
          isOpen={avatarPopupOpened}
          submitHandler={(link) => {
            updateAvatar(link).then((value) => {
              setCurrentUser(value);
              setavatarPopupOpened(!avatarPopupOpened);
            });
          }}
          onClose={() => {
            setavatarPopupOpened(!avatarPopupOpened);
          }}
        ></AvatarPopup>
        <PopupWithForm
          isOpen={doomedCard != ""}
          submitHandler={(e) => {
            e.preventDefault();
            handleCardDelete(doomedCard);
            setDoomedCard("");
            setCards(cards.filter((card) => card != doomedCard));
          }}
          onClose={() => {
            setDoomedCard("");
          }}
          buttonText={"Да"}
          popupTitle={"Вы уверены?"}
          formName={"Delete"}
        ></PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={() => {
            setSelectedCard("");
          }}
        ></ImagePopup>

        <Header />
        <Main
          dataForCards={{
            setDoomedCard: setDoomedCard,
            handleCardLike: handleCardLike,
            setSelectedCard: setSelectedCard,
          }}
          cards={cards}
          onAddPopupOpen={() => {
            setaddPopupOpened(!addPopupOpened);
          }}
          onEditPopupOpen={() => {
            setEditPopupOpened(!editPopupOpened);
          }}
          onAvatarPopupOpen={() => {
            setavatarPopupOpened(!avatarPopupOpened);
          }}
        ></Main>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
