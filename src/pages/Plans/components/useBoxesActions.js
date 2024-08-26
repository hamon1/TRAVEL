import { set } from "date-fns";
import { useState } from "react";
import { ActionSheetIOS, Platform } from "react-native";
import { Icon } from "react-native-vector-icons/Icon";
import { removeBoxes } from "../lib/boxes";



export default function useBoxesActions({id, description}) {
    const [isSelecting, setIsSelecting] = useState(false);

    const edit = () => {
        console.log('편집');
    };
    const remove = async () => {
        await removeBoxes(id);
    };

    const onPressMore = () => {
        if (Platform.OS === 'android') {
            setIsSelecting(true);
        } else {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['수정', '삭제', '취소'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        edit();
                    } else if (buttonIndex === 1) {
                        remove();
                    }
                },
            );
        }
    };

    const actions = [
        {
            icon: 'edit',
            text: '수정',
            onPress: edit,
        },
        {
            icon: 'delete',
            text: '삭제',
            onPress: remove,
        },
    ];

    const onClose = () => {
        setIsSelecting(false);
    };

    return {
        isSelecting,
        onPressMore,
        onClose,
        actions,
    };
}