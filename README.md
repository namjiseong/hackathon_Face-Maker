# severtest
nodejs + teachable machine test



서버 시작시

1. npm install express 확인
2. 작업 폴더 생성할 위치에서 express 파일이름
3. pm2 설치할거면 설치
4. npm install 해야함
5. npm start or pm2 사용으로 실시간 서버 열기

jade -> html 위해서
1. npm install consolidate
2. npm install swig
3. app.js 파일에   
var cons = require('consolidate');   
app.engine('html', cons.swig);   
app.set('views', path.join(__dirname, 'views'));   
app.set('view engine', 'html');   
추가
