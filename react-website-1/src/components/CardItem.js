import React from 'react'

function CardItem(props) {
    return (
        <li className='cards__item'>
            <div className='cards__item__link' onClick={props.onClick}>
                <figure className='cards__item__pic-wrap' data-category={props.label}>
                    <img
                        src={props.src}
                        alt='Travel Image'
                        className='cards__item__img' 
                    />
                </figure>
                <div className='cards__item__info'>
                    <h5 className='cards__item__text'>{props.text}</h5>
                </div>
            </div>
        </li>
    )
}

export default CardItem
