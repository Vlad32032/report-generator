import { useEffect, useState } from "react"
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"

import MyDocument from "../MyDocument/MyDocument"
import ItemInput from "../ItemInputs/ItemInputs"

interface IItem {
    number: string,
    name: string,
    type: string,
    quantity: string,
    price: string,
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

        const year = arr[0].slice(2);
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
        const all = value.items.reduce((acc, item) => (Number(item.price) * Number(item.quantity)) + acc, 0)
        const nds = all / 100 * 20
        const allAndNds = all + nds

        setValue({...value, price: {all, nds, allAndNds}})
    }

    const addItem = ( name: string, type: string, quantity: string, price: string ) => {
        const item = {
            number: `${value.items.length + 1}`,
            name: name,
            type: type,
            quantity: quantity,
            price: price,
        }

        setValue({...value, items: [...value.items, item]})
    }

    const removeItem = (number: string) => {
        const arr = value.items.filter((item) => item.number !== number)

        setValue({...value, items: [...arr]})
    }

    useEffect(() => {
        countPrice()
    }, [value.items])

    return (
        <form className="mainForm">
            <h1 className="mainForm__title">Выставить акт выполненных работ</h1>

            <div className="mainForm__main">
                <div className="mainForm__inputWrapper">
                    <label>Акт выполненых работ №</label>
                    <input type="number" onChange={(e) => setValue({...value, actNumber: e.target.value})}/>
                </div>

                <div className="mainForm__inputWrapper">
                    <label>Дата</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)}/>
                </div>
            
                <div className="mainForm__inputWrapper">
                    <label>Исполнитель</label>
                    <input type="text" onChange={(e) => setValue({...value, worker: e.target.value})}/>
                </div>

                <div className="mainForm__inputWrapper">
                    <label>Заказчик</label>
                    <input type="text" onChange={(e) => setValue({...value, employer: e.target.value})}/>
                </div>
            </div>

            <div className="mainForm__itemInputWrapper">
                {
                    value.items.map((item) => <ItemInput key={item.number} addItem={addItem} removeItem={removeItem} number={item.number} propValue={{...item}}/>)
                }

                <ItemInput addItem={addItem} removeItem={removeItem} number={`${value.items.length + 1}`} />
            </div>
            
            <div className="mainForm__buttonsWrapper">
                <button className="mainForm__button"  onClick={() => setViewerOpen(!viewerOpen)} type='button'>Открыть</button>

                <button className="mainForm__button">
                    <PDFDownloadLink  document={<MyDocument {...value} />} fileName="somename.pdf">Скачать</PDFDownloadLink>
                </button>
            </div>

            

            { viewerOpen &&
                <div className="PDFViewerWrapper">
                    <PDFViewer className='PDFViewer'>
                        <MyDocument {...value} />
                    </PDFViewer>

                    <button className="PDFViewer__buttonOpen"  onClick={() => setViewerOpen(!viewerOpen)} type='button'>Закрыть</button>
                </div>
            }
        </form>
    )
}

export default MainForm 