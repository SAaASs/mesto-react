export function FullImagePopup({imgUrl, onClose}){
    return (
        <div id="full-image-popup" className="full-image-popup popup full-image-popup_darker popup_opened">
        <div className="full-image-popup__img-container">
            <img id="full-image-popup__img" className="full-image-popup__img" alt="Место" src={imgUrl}/>
            <button  onClick={onClose} type="button" className="popup__close-button"></button>
            <p className="full-image-popup__img-name"></p>
        </div>
    </div>
    )
}