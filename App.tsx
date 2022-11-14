import {StatusBar} from 'expo-status-bar';
import {
    ActivityIndicator,
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    ScrollView,
    Button,
    Alert,
    TouchableOpacity,
    TextInput, KeyboardAvoidingView, FlatList, ListRenderItem
} from 'react-native';
import {useState} from 'react';
import Header from './src/header/Header';

export const {width, height} = Dimensions.get('screen');
export const WIDTH = width;
export const HEIGHT = height;
export const PADDING = 20;

// const titles = ['iphone', 'macbook', 'applewatch', 'ipad', 'MacbookPro'];
// const prices = [100, 300, 500, 70, 900];
//
// type DataType = {
//     id: number;
//     title: string;
//     price: number;
// }
//
// const data: DataType[] = new Array(100).fill(null).map((_, index) => ({
//     id: index + 1,
//     title: titles[index % titles.length],
//     price: prices[index % prices.length]
// }));


const countries = ['USA', 'Argentina', 'New Zealand', 'Thailand'];
const propertiesName = ['villa', 'appartement', 'house', 'hotel'];
const prices = [100, 200, 500, 50, 300];
const dates = ['28 Nav - 3 Dec', '3 Dec - 25 Dec', '25 Dec - 18 Jan', '18 Jav - 15 Mar'];
const imgSrcs = [
    'https://a0.muscache.com/im/pictures/8e4334cc-4484-4af7-894e-823b85999449.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/d7c1f140-c33a-4d68-aaf8-b7b8d7292b11.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-50079973/original/c06def22-bd48-4900-8e7c-ca46092f952a.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-45465864/original/3d966c94-4c87-479b-8eeb-4889e9fb6ac9.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/337660c5-939a-439b-976f-19219dbc80c7.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/4f70b681-a792-4530-8c52-f2a8d262942d.jpg?im_w=720'
];

const dataProperty: DataPropertyType[] = new Array(50).fill(null).map((_, index) => ({
    id: index + 1,
    country: countries[index % countries.length],
    propertyName: propertiesName[index % propertiesName.length],
    price: prices[index % prices.length],
    date: dates[index % dates.length],
    imgSrc: imgSrcs[index % imgSrcs.length],
}))

type DataPropertyType = {
    id: number;
    country: string;
    propertyName: string;
    price: number;
    date: string;
    imgSrc: string
}

const dataFilter = [
    {title: 'Beaches', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1238/1238964.png?w=1060&t=st=1668438669~exp=1668439269~hmac=fd0ebdea0213ee07affc5047751ecf12ab7f4a9e0224c245a75a5bebcc08a44b'},
    {title:'Desert', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1043/1043597.png?w=1060&t=st=1668438644~exp=1668439244~hmac=f434f55f9c63723c635e0ba13a11d2dda0783e13fa6e03228bf2f52f046e5f0f'},
    {title:'Boats', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1227/1227691.png?w=1060&t=st=1668438562~exp=1668439162~hmac=0800f081a98e1c97502c508fdc4ef00c48a5a5be548657bffb302613d3c92ce5'},
    {title:'Arctic', imgSrc: 'https://cdn-icons-png.flaticon.com/512/721/721173.png?w=1060&t=st=1668438617~exp=1668439217~hmac=72b0fddc580d946257e6a1adba279ec208dbbd4d4e7799636be4fd7d76ed3792'},
    {title: 'Castles', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1238/1238985.png?w=1060&t=st=1668438597~exp=1668439197~hmac=88ba4408fab478f933b1bc20102d84cf49a5b9d46575796844623f177ca80742'},
    {title: 'Beaches', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1238/1238964.png?w=1060&t=st=1668438669~exp=1668439269~hmac=fd0ebdea0213ee07affc5047751ecf12ab7f4a9e0224c245a75a5bebcc08a44b'},
    {title: 'Desert', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1043/1043597.png?w=1060&t=st=1668438644~exp=1668439244~hmac=f434f55f9c63723c635e0ba13a11d2dda0783e13fa6e03228bf2f52f046e5f0f'},
    {title:'Arctic', imgSrc: 'https://cdn-icons-png.flaticon.com/512/721/721173.png?w=1060&t=st=1668438617~exp=1668439217~hmac=72b0fddc580d946257e6a1adba279ec208dbbd4d4e7799636be4fd7d76ed3792'},
    {title: 'Castles', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1238/1238985.png?w=1060&t=st=1668438597~exp=1668439197~hmac=88ba4408fab478f933b1bc20102d84cf49a5b9d46575796844623f177ca80742'},
    {title: 'Beaches', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1238/1238964.png?w=1060&t=st=1668438669~exp=1668439269~hmac=fd0ebdea0213ee07affc5047751ecf12ab7f4a9e0224c245a75a5bebcc08a44b'},
    {title: 'Boats', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1227/1227691.png?w=1060&t=st=1668438562~exp=1668439162~hmac=0800f081a98e1c97502c508fdc4ef00c48a5a5be548657bffb302613d3c92ce5'}
];
const dataFooter = [{title:'Explore', imgSrc: 'https://cdn-icons-png.flaticon.com/512/751/751463.png?w=1060&t=st=1668438538~exp=1668439138~hmac=29bc8095bd568a59891753998ba225ce599b524d8ec3c4eecd4e8d6f92533f22'},
    {title: 'WishList', imgSrc: 'https://cdn-icons-png.flaticon.com/512/49/49955.png?w=1060&t=st=1668438435~exp=1668439035~hmac=915ab0ad7c8b0efc80d582a6bc2f3ec94b4a383ad5715c78437afb5d5b79273b'},
    {title: 'Tips', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1237/1237974.png?w=1060&t=st=1668438488~exp=1668439088~hmac=00fdd6a4ac9cb089f8dbdd143085710e9d9641fa1a0e7a871a3c15b3b7959ce6' },
    {title: 'Inbox', imgSrc:'https://cdn-icons-png.flaticon.com/512/481/481659.png?w=1060&t=st=1668438904~exp=1668439504~hmac=ab77cd71dfb50ae4bd6c3c7ca74708e8fe4612970ee592fcfa53a89d2f4d062a'},
    {title: 'Profile', imgSrc: 'https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=1060&t=st=1668438509~exp=1668439109~hmac=3ea61ad56c98c00bb000364aaee6721a22cb42f4f8caf18f09dd8f9511ad2f66'}
];

type DataFilterType = {
    title: string;
    imgSrc: string;
}


export default function App() {
    const [value, setValue] = useState('');


    const renderItemData: ListRenderItem<DataFilterType> = ({item}) => {
        const {title, imgSrc} = item;
        return (
            <View style={styles.dataFilter}>
                <Image style={styles.imgSmall}
                       source={{uri: imgSrc}}
                       // source={{uri: 'https://mpng.subpng.com/20210331/lfz/transparent-sunbed-icon-hotel-and-travel-icon-beach-icon-60649402c90d14.4498528816172042268235.jpg'}}
                />
                <View>
                    <Text style={styles.filterText}>{title}</Text>
                </View>
            </View>
        )
    }


    const renderItemProperty: ListRenderItem<DataPropertyType> = ({item}) => {
        const {country, propertyName, price, date, imgSrc} = item;
        return (
            <View style={styles.item}>
                <Image style={styles.img}
                       source={{uri: imgSrc}}
                />
                <View>
                    <Text style={styles.bold}>{country}</Text>
                    <Text>{propertyName}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.bold}>{price}</Text>
                </View>
            </View>)
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.search}
                        onChangeText={setValue}
                        value={value}
                        clearButtonMode="always"
                        inlineImageLeft='search_icon'
                        onSubmitEditing={() =>  Alert.alert('You found' + " " + value)}
                    />
                </View>
                <ScrollView horizontal={true}>
                    <FlatList
                        data={dataFilter}
                        numColumns={dataFilter.length}
                        renderItem={renderItemData}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                </ScrollView>
            </View>
            <ScrollView>
                <FlatList
                    data={dataProperty}
                    renderItem={renderItemProperty}
                    // stickyHeaderIndices={[0]}
                    ListEmptyComponent={() => <View><Text>No data</Text></View>}
                    // ListHeaderComponent={() =>
                        // <Header />
                        // <View style={styles.header}>
                        //     <View>
                        //         <TextInput
                        //             style={styles.search}
                        //             onChangeText={setValue}
                        //             value={value}
                        //             clearButtonMode="always"
                        //         />
                        //     </View>
                        //     <ScrollView horizontal={true}>
                        //         <FlatList
                        //             data={dataFilter}
                        //             numColumns={dataFilter.length}
                        //             renderItem={renderItemData}
                        //             columnWrapperStyle={{justifyContent: 'space-between'}}
                        //         />
                        //     </ScrollView>
                        // </View>
                />
            </ScrollView>
            <View style={styles.footer}>
                <FlatList
                    data={dataFooter}
                    renderItem={renderItemData}
                    numColumns={dataFooter.length}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 65,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    // item: {
    //     backgroundColor: '#7fd07f',
    //     marginVertical: 5,
    //     width: (WIDTH - 2 * PADDING) / 2 - 5,
    //     height: (WIDTH - 2 * PADDING) / 2 / 2 - 5,
    // },
    // touchable: {
    //     paddingHorizontal: 50,
    //     paddingVertical: PADDING,
    //     backgroundColor: '#210564',
    // },
    bold: {
        fontWeight: '700',
    },
    date: {
        fontWeight: '300',
        fontStyle: 'italic',
    },
    item: {
        marginVertical: 5,
        display: 'flex',
    },
    img: {
        backgroundColor: '#7df5f5',
        width: (WIDTH - 2 * PADDING),
        height: (HEIGHT / 2.5),
    },
    footer:{
      paddingBottom: 20,
    },
    header: {
        backgroundColor: '#fff',
        zIndex: 3,
    },
    search: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'gray',
        width: (WIDTH - 2 * PADDING),
        paddingVertical: 15,
    },
    filterBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    dataFilter: {
        padding: 5,
    },
    searchBar:{
        display:'flex',
        justifyContent:'space-between'
    },
    imgSmall: {
        backgroundColor: '#fff',
        // backgroundColor: '#7fd07f',
        width:  40,
        // width: (WIDTH - 4 * PADDING) / 5,
        height: 40,
    },
    filterText: {
        textAlign: 'center',
    }
});


// <KeyboardAvoidingView>
//     <View style={styles.container}>
//         <ActivityIndicator/>
//         <ActivityIndicator size="large"/>
//         <ActivityIndicator size="small" color="#0000ff"/>
//         <ActivityIndicator size="large" color="#00ff00"/>
//         <Text>Open up App.tsx to start working on your app!</Text>
//         <Image
//             style={{width: 100, height: 100}}
//             source={{
//                 uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}
//         />
{/*<Button*/
}
{/*    title="Press me"*/
}
{/*    onPress={() => Alert.alert('Simple Button pressed')}*/
}
{/*/>*/
}
{/*<TouchableOpacity*/
}
{/*    style={styles.touchable}*/
}
{/*    // style={{*/
}
{/*    //     paddingHorizontal: 50,*/
}
{/*    //     paddingVertical: 20,*/
}
{/*    //     backgroundColor: '#210564'*/
}
{/*    // }}*/
}
{/*    onPress={() => {*/
}
{/*    }}*/
}
{/*    // delayLongPress you can set or not*/
}
{/*    delayLongPress={3000}*/
}
{/*    onLongPress={() => {*/
}
{/*        Alert.alert('Long press');*/
}

//     }}
// >
//     <Text>Press Here</Text>
// </TouchableOpacity>
// <TextInput
//     style={{
//         borderWidth: 1,
//         borderColor: 'red',
//         width: 250,
//         paddingVertical: 15,
//         paddingHorizontal: 5
//     }}
//     // onChange={() => {}}
//     onChangeText={setValue}
//     value={value}
//     clearButtonMode="always"
//     // onSubmitEditing={() => {}}
// />
// <Text>{value}</Text>
// <StatusBar style="auto"/>
{/*<View style={styles.container}>*/
}
{/*<FlatList*/
}
{/*    data={data}*/
}
{/*    renderItem={renderItem}*/
}
{/*    numColumns={2}*/
}
{/*    stickyHeaderIndices={[0]}*/
}
{/*    ListEmptyComponent={() => <View><Text>No data</Text></View>}*/
}
{/*    ListHeaderComponent={() => <View><Text>Header</Text></View>}*/
}
{/*    columnWrapperStyle={{justifyContent: 'space-between'}}*/
}
{/*    // keyExtractor={item => item.id}*/
}
{/*/>*/
}
// </View>
// );
