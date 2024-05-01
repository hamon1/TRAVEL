import { getUniqueId } from "react-native-device-info";
import { FlatList } from "react-native-gesture-handler";



interface Message {
    user: string;
    message: string;
}

const ChatScreen = () =>{
    const [sercerState, setSercerState] = useState('Loading...');
    const [messageText, setMessageText] = useState('');
    const [serverMessages, setServerMessages] = useState([]);
    let usrId = getUniqueId();
    const serverMessagesList: Message[] = [];
    const webSocket = useRef(null);
    useEffect(() => {
        webSocket.current = new WebSocket('ws://192.168.1.100:3001');
        webSocket.current.onopen = () => {
            setServerState('Connected to the server');
        };
        webSocket.current.onmessage = e => {
            let parse = JSON.parse(e.data);
            serverMessagesList.push(parse);
            setServerMessages([...serverMessagesList]);
        };
        webSocket.current.onerror = (event) => {
            setServerState(e.message);
        }
        webSocket.current.onclose = (event) => {
            setServerMessages('Disconnected from the server');
        };
        return () => {
            webSocket.current.close();
        }
    }, []);
    const sendMessage = () => {
        let str = JSON.stringify({user: usrId, message: messageText});
        webSocket.current.send(str);
        setMessageText('');
    };
    return (
        <View>
        <Text>{serverState}</Text>
        <View>
        style={{
            padding: 5,
            flexGrow: 1,
        }}>
        <FlatList
        style = {styles.list}
        contentContainerStyle = {{paddingBottom: 50}}
        data={serverMessages}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <Text
        )}
            </View></View>
    )
};
