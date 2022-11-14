import {FlatList, Image, ListRenderItem, Text, TextInput, View, ScrollView, StyleSheet} from 'react-native';
import {useState} from 'react';
import {PADDING, WIDTH} from '../../App';

const dataFilter = ['Beaches', 'Desert', 'Boats', 'Arctic', 'Castles', 'Beaches', 'Desert', 'Boats', 'Arctic', 'Castles', 'Beaches', 'Desert', 'Boats', 'Arctic', 'Castles']


const Header = () => {

    const [value, setValue] = useState('');


    const renderItemData: ListRenderItem<string> = ({item}) => {
        return (
            <View style={styles.dataFilter}>
                <Image style={styles.imgSmall}/>
                <View>
                    <Text style={styles.filterText}>{item}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <View>
                <TextInput
                    style={styles.search}
                    onChangeText={setValue}
                    value={value}
                    clearButtonMode="always"
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
    )
}

export default Header;

const styles = StyleSheet.create({
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
        padding: 2,
    },
    imgSmall: {
        backgroundColor: '#7fd07f',
        width: (WIDTH - 4 * PADDING)/5,
        height: 80,
    },
    filterText: {
        textAlign: 'center',
    }
});