import { StyleSheet } from "react-native"


export default function DetailsPopup(id, title, name, type, content) {

    const handleDelete = () => {
        console.log('delete' + id)
    }

    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <Text>{content}</Text>
            

            <Button title="Delete Item" onPress={handleDelete} color="red" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#444',
        marginVertical: 8,
        borderRadius: 4,
        position: "absolute",
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
})