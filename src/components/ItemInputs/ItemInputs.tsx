import { useState } from "react"

interface IItemInput {
    addItem: (name: string, type: string, quantity: string, price: string) => void,
    removeItem: (number: string) => void,
    number: string,
    id: string,
    propValue?: {
        name: string,
        type: string,
        quantity: string,
        price: string,
    }
}

const ItemInput = ({ addItem, removeItem, number, id, propValue}: IItemInput ) => {
    const [value, setValue] = useState({
        name: propValue?.name || '',
        type: propValue?.type || '',
        quantity: propValue?.quantity || '',
        price: propValue?.price || '',
    })
    const canAdd = propValue ? false : true

    const onClickAdd = () => {
        addItem(value.name, value.type, value.quantity, value.price)
        setValue({
            name: '',
            type: '',
            quantity: '',
            price: '',
        })
    }



    return (
        <div>
            <div className="itemInput">
                <h3 className="itemInput__number">{number}</h3>

                <div className="itemInput__inputMainWrapper inputWrapper">
                    <input className="itemInput__input input" type="text" placeholder="" maxLength={30}
                        value={value.name} onChange={(e) => canAdd && setValue({...value, name: e.target.value})}
                    />
                    <label className="inputLabel">Наименование</label>
                </div>

                <div className="itemInput__inputWrapper inputWrapper">
                    <input className="itemInput__secondInput input" type="text" placeholder="" maxLength={8}
                        value={value.type} onChange={(e) => canAdd && setValue({...value, type: e.target.value})}
                    />
                    <label className="inputLabel">Ед. Изм.</label>
                </div>

                <div className="itemInput__inputWrapper inputWrapper">
                    <input className="itemInput__secondInput input" type="number" placeholder="" max="99999"
                        value={value.quantity} onChange={(e) => canAdd && Number(e.target.value) < 99999 ? setValue({...value, quantity: e.target.value}) : setValue({...value, quantity: "99999"})}
                    />
                    <label className="inputLabel">Количество</label>
                </div>

                <div className="itemInput__inputWrapper inputWrapper">
                    <input className="itemInput__secondInput input" type="number" placeholder="" max="9999999"
                        value={value.price} onChange={(e) => canAdd && Number(e.target.value) < 9999999 ? setValue({...value, price: e.target.value}) : setValue({...value, price: "9999999"})}
                    />
                    <label className="inputLabel">Цена</label>
                </div>

                { canAdd
                    ? <button className="itemInput__button" onClick={onClickAdd} type="button">Добавить</button>
                    : <button className="itemInput__button itemInput__button--remove" onClick={() => removeItem(id)} type="button">Удалить</button>
                }
            </div>
        </div>
    )
}

export default ItemInput