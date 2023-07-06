export function LeCard({card, clickHandler}) {
    return (
        <div className="element">
        <button data-id="" type="button" className="element__delete"></button>
        <img alt={card.name} onClick={clickHandler} className="element__image" src={card.link}/>
        <div className="element__bottom">
            <h2 className="element__bottom-text">{card.name}</h2>
            <div className="element__bottom-like-container">
                <button type="button" data-id="full-image-popup" className="element__bottom-like"></button>
                <div className="element__bottom-like-counter">{card.likes.length}</div>
            </div>
        </div>
    </div>
    )
}