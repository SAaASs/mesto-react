export function PopupWithForm({popupTitle, formName, children, onClose, popupClases, buttonText}) {
    return (
        <div id={`popup${formName}`} className="popup popup_opened">
            <div className="popup__container">
                <button onClick={onClose} id={`popup${formName}CloseButton`} type="button" className="popup__close-button"></button>
                <h2 className="popup__title">{popupTitle}</h2>
                <form name={`popup${formName}Form`} className="popup__form" id={`profile${formName}Form`}>
                    {children}
                    <button type="submit" className="popup__save" id="popupEditSave">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

