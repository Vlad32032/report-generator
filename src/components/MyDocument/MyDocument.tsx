import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

import { IValue } from '../MainForm/MainForm';

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: '60 40 24 60',
    backgroundColor: '000',
    fontFamily : "Roboto",
    fontSize: '10',
    fontWeight: 'normal',
    color: 'fff',
  },

  // title
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: '16',
  },

  title__number: {
    width: '100',
    paddingLeft: '2',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  // date
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10',
    fontSize: '10',
  },

  date__day: {
    width: '14',
    paddingLeft: '2',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  date__month: {
    width: '100',
    paddingLeft: '3',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  date__year: {
    width: '14',
    paddingLeft: '1',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  // mainInfo
  mainInfo: {
    gap: '5',
    marginTop: '30',
    fontSize: '10',
  },

  mainInfo__wrapper: {
    flexDirection: 'row',
  },

  mainInfo__text: {
    flexGrow: 1,
    paddingLeft: '3',
    marginLeft: '2',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  // table
  table: {
    marginTop: '30',
    fontSize: '8'
  },

  table__titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    height: '20',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  table__Row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    height: '20',
    marginTop: '-1px',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
    // borderTop: 'none',
  },

  table__finalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    height: '19',
  },

  table__column: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20',
    borderRightWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  table__column1: {
    width: '20',
  },

  table__column2: {
    width: '250',
  },

  table__column3: {
    width: '54',
  },

  table__column4: {
    width: '54',
  },

  table__column5: {
    width: '54',
  },

  table__column6: {
    width: '75',
    border: 'none',
  },

  table__finalColumn1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '421',
    height: '20',
    paddingRight: '5',
  },

  table__finalColumn2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75',
    height: '20',
    marginTop: '-1px',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
    // borderTop: 'none',
  },

  // final

  finalInfo: {
    marginTop: '30',
  },

  signature: {
    flexDirection: 'row',
    gap: '30',
    marginTop: '20',
  },

  signature__wrapper: {

  },

  signature__wrapperInfo: {
    flexDirection: 'row',
  },

  signature__text: {
    width: '150',
    paddingLeft: '2',
    marginLeft: '5',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'fff',
  },

  signature__printPlace1: {
    paddingLeft: '120',
    marginTop: '10',
  },

  signature__printPlace2: {
    paddingLeft: '105',
    marginTop: '10',
  },
});

// Create Document Component
const MyDocument = ({ actNumber, worker, employer, date, items, price }: IValue) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>Акт выполненных работ №</Text>
        <Text style={styles.title__number} >{actNumber}</Text>
      </View>

      <View style={styles.date}>
        <Text>от «</Text>
        <Text style={styles.date__day}>{date.day}</Text>
        <Text>»</Text>
        <Text style={styles.date__month}>{date.month}</Text>
        <Text>20</Text>
        <Text style={styles.date__year}>{date.year}</Text>
        <Text>г.</Text>
      </View>

      <View style={styles.mainInfo}>
        <View style={styles.mainInfo__wrapper}>
          <Text>Исполнитель</Text>
          <Text style={styles.mainInfo__text}>{worker}</Text>
        </View>

        <View style={styles.mainInfo__wrapper}>
          <Text>Заказчик</Text>
          <Text style={styles.mainInfo__text}>{employer}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.table__titleRow}>
          <View style={[styles.table__column, styles.table__column1]}>
            <Text>№</Text>
          </View>
          <View style={[styles.table__column, styles.table__column2]}>
            <Text>{'Наименование работы (услуги)'}</Text>
          </View>
          <View style={[styles.table__column, styles.table__column3]}>
            <Text>Ед. Изм.</Text>
          </View>
          <View style={[styles.table__column, styles.table__column4]}>
            <Text>Количество</Text>
          </View>
          <View style={[styles.table__column, styles.table__column5]}>
            <Text>Цена</Text>
          </View>
          <View style={[styles.table__column, styles.table__column6]}>
            <Text>Сумма</Text>
          </View>
        </View>

        { items.length > 0
          ? items.map((item, i) => <View style={styles.table__Row} wrap={false}>
              <View style={[styles.table__column, styles.table__column1]}>
                <Text>{`${i + 1}`}</Text>
              </View>
              <View style={[styles.table__column, styles.table__column2]}>
                <Text>{item.name}</Text>
              </View>
              <View style={[styles.table__column, styles.table__column3]}>
                <Text>{item.type}</Text>
              </View>
              <View style={[styles.table__column, styles.table__column4]}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={[styles.table__column, styles.table__column5]}>
                <Text>{item.price}</Text>
              </View>
              <View style={[styles.table__column, styles.table__column6]}>
                <Text>{Number(item.price) * Number(item.quantity)}</Text>
              </View>
            </View>)

          : <View style={styles.table__Row} wrap={false}>
              <View style={[styles.table__column, styles.table__column1]}>
                <Text>1</Text>
              </View>
              <View style={[styles.table__column, styles.table__column2]}>
                <Text></Text>
              </View>
              <View style={[styles.table__column, styles.table__column3]}>
                <Text></Text>
              </View>
              <View style={[styles.table__column, styles.table__column4]}>
                <Text></Text>
              </View>
              <View style={[styles.table__column, styles.table__column5]}>
                <Text></Text>
              </View>
              <View style={[styles.table__column, styles.table__column6]}>
                <Text></Text>
              </View>
            </View>
        }

        <View wrap={false}>
          <View style={styles.table__finalRow}>
            <View style={styles.table__finalColumn1}>
              <Text>Итого без НДС:</Text>
            </View>
            <View style={styles.table__finalColumn2}>
              <Text>{price.all}</Text>
            </View>
          </View>

          <View style={styles.table__finalRow}>
            <View style={styles.table__finalColumn1}>
              <Text>Итого НДС:</Text>
            </View>
            <View style={styles.table__finalColumn2}>
              <Text>{price.nds}</Text>
            </View>
          </View>

          <View style={styles.table__finalRow}>
            <View style={styles.table__finalColumn1}>
              <Text>Всего к оплате:</Text>
            </View>
            <View style={styles.table__finalColumn2}>
              <Text>{price.allAndNds}</Text>
            </View>
          </View>
        </View>
      </View>

      <View wrap={false}>
        <View style={styles.finalInfo}>
          <Text>{"Вышеперечисленные работы (услуги) выполнены полностью и в срок. Заказчик претензий по объему, качеству и срокам оказания услуг претензий не имеет."}</Text>
        </View>
        
        <View style={styles.signature}>
          <View style={styles.signature__wrapper}>
            <View style={styles.signature__wrapperInfo}>
              <Text>Исполнитель</Text>
              <Text style={styles.signature__text}></Text>
            </View>
            <Text style={styles.signature__printPlace1}>М.П.</Text>
          </View>

          <View style={styles.signature__wrapper}>
            <View style={styles.signature__wrapperInfo}>
              <Text>Заказчик</Text>
              <Text style={styles.signature__text}></Text>
            </View>
            <Text style={styles.signature__printPlace2}>М.П.</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument