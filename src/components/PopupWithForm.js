export function PopupWithForm({popupTitle, formName, children, onClose, popupClases}) {
    return (
        <div id={`popup${formName}`} className={popupClases}>
            <div className="popup__container">
                <button onClick={onClose} id={`popup${formName}CloseButton`} type="button" className="popup__close-button"></button>
                <h2 className="popup__title">{popupTitle}</h2>
                <form name={`popup${formName}Form`} className="popup__form" id={`profile${formName}Form`}>
                    {children}
                </form>
            </div>
        </div>
    )
}

