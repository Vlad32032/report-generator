import { useState } from "react"

interface IItemInput {
    addItem: (name: string, type: string, quantity: string, price: string) => void,
    removeItem: (number: string) => void,
    number: string,
    propValue?: {
        name: string,
        type: string,
        quantity: string,
        price: string,
    }
}

const ItemInput = ({ addItem, removeItem, number, propValue}: IItemInput ) => {
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

                <div>
                    <label>Наименование</label>
                    <input className="itemInput__input" type="text"
                        value={value.name} onChange={(e) => canAdd && setValue({...value, name: e.target.value})}
                    />
                </div>

                <div>
                    <label>Ед. Изм.</label>
                    <input className="itemInput__secondInput" type="text"
                        value={value.type} onChange={(e) => canAdd && setValue({...value, type: e.target.value})}
                    />
                </div>

                <div>
                    <label>Количество</label>
                    <input className="itemInput__secondInput" type="number"
                        value={value.quantity} onChange={(e) => canAdd && setValue({...value, quantity: e.target.value})}
                    />
                </div>

                <div>
                    <label>Цена</label>
                    <input className="itemInput__secondInput" type="number"
                        value={value.price} onChange={(e) => canAdd && setValue({...value, price: e.target.value})}
                    />
                </div>

                { canAdd
                    ? <button onClick={onClickAdd} type="button">Добавить</button>
                    : <button onClick={() => removeItem(number)} type="button">Удалить</button>
                }
            </div>
        </div>
    )
}

export default ItemInput