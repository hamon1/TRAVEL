import {Linking} from 'react-native';

// 구글 플레이 스토어 링크
const GOOGLE_PLAY_STORE_LINK = 'market://details?id=io.github.Antodo';
// 구글 플레이 스토어가 설치되어 있지 않을 때 웹 링크
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=io.github.Antodo';
// 애플 앱 스토어 링크
const APPLE_APP_STORE_LINK =
  'itms-apps://itunes.apple.com/us/app/id1553604322?mt=8';
// 애플 앱 스토어가 설치되어 있지 않을 때 웹 링크
const APPLE_APP_STORE_WEB_LINK =
  'https://apps.apple.com/us/app/antodo-%EC%8B%AC%ED%94%8C%ED%95%9C-%EC%86%90%EA%B8%80%EC%94%A8-%ED%95%A0%EC%9D%BC-%EA%B3%84%ED%9A%8D-%EB%A9%94%EB%AA%A8/id1553604322';
// 인스타그램 링크
const INSTAGRAM_LINK = 'instagram://user?username=coconut_dailyapp';
// 인스타그램이 설치되어 있지 않을 때 웹 링크
const INSTAGRAM_WEB_LINK = 'https://www.instagram.com/coconut_dailyapp/';

const TMONEYGO_LINK = 'https://apps.apple.com/kr/app/%ED%8B%B0%EB%A8%B8%EB%8B%88go-%EC%98%A8%EB%8B%A4%ED%83%9D%EC%8B%9C-%EA%B3%A0%EC%86%8D%EC%8B%9C%EC%99%B8-%EB%94%B0%EB%A6%89%EC%9D%B4-%ED%83%80%EC%8A%88-%ED%82%A5%EB%B3%B4%EB%93%9C/id1483433931';
const KORAILTALK_LINK = 'https://apps.apple.com/kr/app/%EC%BD%94%EB%A0%88%EC%9D%BC%ED%86%A1/id1000558562';

const BUS_LINK = 'https://www.kobus.co.kr/main.do';

// 위의 화면에서 버튼 클릭 이벤트
const onPress = useCallback((index: number) => {
    if (index === 0) return; // 앱 버전은 클릭 이벤트가 없다.

    if (index === 1) { // 리뷰 남기기는 android와 ios의 링크를 각각 지정한다.
      if (Platform.OS === 'android') {
        handlePress(GOOGLE_PLAY_STORE_LINK, GOOGLE_PLAY_STORE_WEB_LINK);
      } else {
        handlePress(APPLE_APP_STORE_LINK, APPLE_APP_STORE_WEB_LINK);
      }
    } else if (index === 2) { // instagram 링크를 지정한다.
      handlePress(INSTAGRAM_LINK, INSTAGRAM_WEB_LINK);
    } else { // opensource 목록은 만들어둔 페이지로 이동한다.
      navigation.navigate('OpensourceScreen'); 
    }
  },
  [navigation],
);

// 각각의 버튼에 대한 실행될 링크(url)와 링크가 실행되지 않을 때 대체 링크(alterUrl)
const handlePress = useCallback(async (url: string, alterUrl: string) => {
  // 만약 어플이 설치되어 있으면 true, 없으면 false
  const supported = await Linking.canOpenURL(url); 

  if (supported) { // 설치되어 있으면
    await Linking.openURL(url);   
  } else { // 앱이 없으면
    await Linking.openURL(alterUrl);
  }
}, []);