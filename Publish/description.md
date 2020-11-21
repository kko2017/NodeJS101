#NPM (Node Package Manager)

- **package.json의 경우 npm init을 통해 생성한다. 오픈소스 라이브러리(패키지)를 여기에 넣어 사용할 수 있다.**

* **package.json의 scripts는 명령어들이다. npm run test, npm run start를 하면 진행이 된다. start같은 경우 워낙 유명하기 때문에 npm start를 해도 실행된다.**

- **오픈소스 라이브러리를 인스톨하기 위해 npm i express(예시)라 쓴다. express가 다운로드 된다. 여러개를 인스톨하려면 npm i 라이브러리1 라이브러리2 라이브러리3라 치면 3개의 라이브러리가 동시에 다운로드된다.**
  - pakage.json의 dependencies에서 확인 가능

* **npm i -D nodemon(예)를 치면 개발용 라이브러리가 다운로드된다. 배포용으로는 사용되지 않는 라이브러리이다. -D가 development를 뜻한다. devDependencies에서 확인가능**

- **라이브러리를 다운로드 받으면 node_modules라는 폴더가 생성되어 거기에 관련된 라이브러리들이 다운로드된다. 다운받는 라이브러리들도 각각 필요한 dependencies가 있기 때문에**
  - 그 파일의 양은 상당하다. 그렇기 때문에 개발단계에서 작성된 node_modules 폴더는 배포시 삭제하여 올리고, 배포용 서버에서 npm i를 하여 node_modules를 따로 받는다.
  - 그렇게 하지 않으면 업로드 양이 너무 많아 비효율적이다.

* **npm i -g rimraf(예)로 다운로드 받으면 global로 다운로드를 받게 된다. 단점은 dependencies에서 확인이 안되기 때문에 후임자가 라이브러리(예, rimraf)를 사용하는지 알 수 없어**
  - 불편함을 야기할 수 있다. 대걔 npm i -g를 써서 다운로드 받는 라이브러리는 terminal에서 명령어로 사용하는 경우가 많다.
  - rimraf의 경우, rimraf (폴더명 or 파일명)을 terminal에서 치면 그 폴더/파일은 삭제가 된다.
  - 이런 global 다운로드의 단점을 막기 위해 npm i -D rimraf를 쳐서 devDependencies에 기록을 남게 하여 쓴다. 이 경우 termianl에서 npx rimraf (폴더명/파일명)을 치면 똑같은 결과를 얻을 수 있다. global 다운로드는 최대한 기피한다.

- **라이브러리 버전은 SemVer 방식으로 기록된다. Major(주 버전).Minor(부 버전).Patch(수 버전) 이다. 모든 버전은 1.0.7과 같은 방식으로 기록되어 있다.**
  - Major 버전이 바뀌면 대대적인 수정이 일어났기 때문에 하위버전과 호환되지 않을 수 있음을 의미
  - Minor 버전이 바뀌면 하위버전과 호환이 되는 정도의 수정
  - Patch 버전이 바뀌면 기존 기능에 버그를 해결한 수정
  - ^1.19.0 ^의 의미는 Major 버전은 바뀌지 못하게 고정하겠다는 의미 ~1.19.0의 의미는 Major와 Minor를 고정시키겠다는 뜻. 그러나 대부분의 경우 Major를 고정시킨다.
  - npm i express@latest는 최신버전 인스톨을 의미 npm i express@4.17.1 => 4.17.1 버전 인스톨을 의미

* **구글로 npm cli documentation를 통해 명령어를 익힐 수 있다.**
  - npm outdated: 어떤 패키지에 기능 변화가 생겼는지 알 수 있음
  - npm uninstall 패키지명: 패키지 삭제
  - npm search 패키지명: npm 패키지 검색가능 (npmjs.com에서도 가능)
  - npm info 패키지명: 패키지의 세부정보 파악 가능
  - npm login: npm 계정 로그인
  - npm ~~whomi~~ **whoami**: npm 계정 누구로 로그인 되어 있는지 확인가능
  - npm version: 존재하는 package 내의 버전을 업데이트 할 수 있음 예를 들어 package가 있는 폴더에서 npm version **major / minor / patch**를 사용해서 업데이트 할 수 있다.
  - npm deprecate [패키지명][버전] [쓸 내용]: 해당 패키지 버전 사용을 지양하게끔 메세지를 띄움. 해당 패키지를 다운로드 받으려 할 때 생성
  - npm publish: 만든 패키지를 배포
  - npm unpulish: 만든 패키지 배포 중단(배포 72시간 내에만 가능)
  - 기타 명령어는 https://docs.npmjs.com 의 **CLI Commands** 에서 확인
