# axios interceptors caching practice

## 설명

axios의 interceptors를 활용한 데이터 caching 연습
![](https://velog.velcdn.com/images/1003gorkd/post/cde8de38-736e-41d9-b7e2-78f50c353851/image.gif)
<br/><br/>

## 작업 과정
https://velog.io/@1003gorkd/React-axios-interceptors-%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%BA%90%EC%8B%B1

## 시작 방법

step1.

```
$npm install
```

step2.

```
$npm start
```

step3. <br/>
.env 파일 등록

```
REACT_APP_BASE_URL=END_POINT_URL
```

## 사용 예제

기본 값 : 캐싱 미사용, 만료시간 5분<br/>

동일 인스턴스에 캐싱 적용 : 인스턴스 생성 시 지정

```javascript
// axios/YesNo.js
instance = this.createInstance({
  cache: { policy: true, expiration_time: 1000 * 5 },
});
```

개별 API에 캐싱 적용 : 개별 API생성 시 지정
```javascript
// axios/YesNo.js
getYesOrNo() {
  return this.instance.get(this.path, {
    cache:{ policy:true, expiration_time: 1000 * 5 }
  });
}
```

호출 방법 : useAxios hooks를 통해 호출
```javascript
// App.js
const { yes_no } = useAxios();

const updateYesOrNo = async () => {
  const response = await yes_no.getYesOrNo();
  ...
};
```