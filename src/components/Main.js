export function Main({onAddPopupOpen, onEditPopupOpen, onAvatarPopupOpen, userName, userDescription, userAvatar, children}) {
    return(
        <main className="main">
        <section className="profile">
            <div className="profile__info">
                <div onClick={onAvatarPopupOpen} className="profile__avatar-container">
                    <button className="profile__avatar-shadow"></button>
                    <img alt="Жак-Ив Кусто" src={userAvatar} className="profile__avatar"/>
                </div>
                <div className="profile__wrap-vert">
                    <div className="profile__wrap-hori">
                        <h1 className="profile__name" id="profile__name">{userName}</h1>
                        <button onClick={onEditPopupOpen} type="button" data-id="popupEdit" className="profile__edit-button"></button>
                    </div>
                    <p className="profile__work" id="profile__work">{userDescription}</p>
                </div>
            </div>
            <button onClick={onAddPopupOpen} type="button" data-id="popupAdd" className="profile__add-button"></button>
        </section>
        <section className="elements">
            {children}
        </section>
    </main>
    )
}

