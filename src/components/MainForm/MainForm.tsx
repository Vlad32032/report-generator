import { useEffect, useState } from "react"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"

import MyDocument from "../MyDocument/MyDocument"
import ItemInput from "../ItemInputs/ItemInputs"

interface IItem {
    number: string,
    name: string,
    type: string,
    quantity: string,
    price: string,
    id: string,
}
 
export interface IValue {
    actNumber: string,
    worker: string,
    employer: string
    date: {
        day: string,
        month: string,
        year: string,
    },
    items: IItem[],
    price: {
        all: number,
        nds: number,
        allAndNds: number,
    }
}

const MainForm = () => {
    const [value, setValue] = useState <IValue>({
        actNumber: '',
        worker: '',
        employer: '',
        date: {
            day: '',
            month: '',
            year: '',
        },
        items: [],
        price: {
            all: 0,
            nds: 0,
            allAndNds: 0,
        }
    })
    const [viewerOpen, setViewerOpen] = useState(false)


    
    const setDate = (date: any) => {
        const arr = date.split('-');

        const year = arr[0].substr(arr[0].length - 2);
        const monthNum =  arr[1];

        let month

        switch (monthNum) {
            case '01':
                month = 'января'
                break
            case '02':
                month = 'февраля'
                break
            case '03':
                month = 'марта'
                break
            case '04':
                month = 'апреля'
                break
            case '05':
                month = 'майя'
                break
            case '06':
                month = 'июня'
                break
            case '07':
                month = 'июля'
                break
            case '08':
                month = 'августа'
                break
            case '09':
                month = 'сентября'
                break
            case '10':
                month = 'октября'
                break
            case '11':
                month = 'ноября'
                break
            case '12':
                month = 'декабря'
                break
        
            default:
                month = ''
                break
        }
        
        setValue({...value, date: {
            day: arr[2],
            month: month,
            year: year,
        }})
    }

    // const newItem = ( number: string, name: string, type: string, quantity: string, price: string) => {
    //     return {
    //         number: number,
    //         name: name,
    //         type: type,
    //         quantity: quantity,
    //         price: price,
    //     }
    // }

    const countPrice = () => {
        const allAndNds = Number(value.items.reduce((acc, item) => (Number(item.price) * Number(item.quantity)) + acc, 0).toFixed(2))
        const nds = Number((allAndNds / 120 * 20).toFixed(2))
        const all = allAndNds - nds

        setValue({...value, price: {all, nds, allAndNds}})
    }

    const addItem = ( name: string, type: string, quantity: string, price: string ) => {
        const item = {
            number: `${value.items.length + 1}`,
            name: name,
            type: type,
            quantity: quantity,
            price: price,
            id: `${value.items.length + price}${name}`
        }

        setValue({...value, items: [...value.items, item]})
    }

    const removeItem = (id: string) => {
        const arr = value.items.filter((item) => item.id !== id)

        setValue({...value, items: [...arr]})
    }

    useEffect(() => {
        countPrice()
    }, [value.items])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [viewerOpen])

    return (
        <>
        <form className="mainForm">
            <h1 className="mainForm__title">Выставить акт выполненных работ</h1>

            <div className="mainForm__main">
                <div className="mainForm__inputWrapper inputWrapper">
                    <input className="input" type="number" placeholder="" value={value.actNumber}
                        onChange={(e) => {
                            Number(e.target.value) < 9999999 ? setValue({...value, actNumber: e.target.value}) : setValue({...value, actNumber: "9999999"})
                        }}
                        min={1} max={9999999}/>
                    <label className="inputLabel">Акт выполненых работ №</label>
                </div>

                <div className="mainForm__inputWrapper inputWrapper">
                    <input className="input" type="date" placeholder="" onChange={(e) => setDate(e.target.value)}/>
                    <label className="inputLabel">Дата</label>
                </div>
            
                <div className="mainForm__inputWrapper inputWrapper">
                    
                    <input className="input" type="text" placeholder="" maxLength={75}
                        onChange={(e) => setValue({...value, worker: e.target.value})}/>
                    <label className="inputLabel">Исполнитель</label>
                </div>

                <div className="mainForm__inputWrapper inputWrapper">
                    <input className="input" type="text" placeholder="" maxLength={75} 
                        onChange={(e) => setValue({...value, employer: e.target.value})}/>
                    <label className="inputLabel">Заказчик</label>
                </div>
            </div>

            <div className="mainForm__itemInputWrapper">
                {
                    value.items.map((item, i) => <ItemInput key={item.number} addItem={addItem} removeItem={removeItem} number={`${i + 1}`} id={item.id} propValue={{...item}}/>)
                }

                <ItemInput addItem={addItem} removeItem={removeItem} number={`${value.items.length + 1}`} id={'1'} />
            </div>
            
            <div className="mainForm__buttonsWrapper">
                <button className="mainForm__button"  onClick={() => setViewerOpen(!viewerOpen)} type='button'>Открыть</button>

                <button className="mainForm__button">
                    <PDFDownloadLink  document={<MyDocument {...value} />} fileName="somename.pdf">Скачать</PDFDownloadLink>
                </button>
            </div>
        </form>

            { viewerOpen &&
                <div className="PDFViewerWrapper">
                    <PDFViewer className='PDFViewer'>
                        <MyDocument {...value} />
                    </PDFViewer>

                    <button className="PDFViewer__buttonOpen"  onClick={() => setViewerOpen(!viewerOpen)} type='button'>Закрыть</button>
                </div>
            }

        </>
    )
}

export default MainForm 