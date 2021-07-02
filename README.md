# 프로젝트와 테스트 실행 방법

- 빌드 툴로는 yarn 을 사용하였습니다. yarn 이 로컬에 설치되어 있어야 합니다. 
- 작업한 컴퓨터는 mac 이고 node version은 12.22.1 입니다. nvm 으로 설치되어 있습니다.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
- 화면을 보면서 검증합니다.
- http://localhost:8080 에 접근하면 검색어를 입력하는 화면이 보입니다. 
```
yarn serve
```


### Test search
- input box 에 값이 입력된 후 검색 기능을 test 합니다. 
- .src/test/search.test.js 파일이 실행됩니다.
```
yarn test-search
```

### Test url
- 검색어로 검색이 되고 난 후 결과에 따라서 보여주는 url 을 테스트 합니다.
- .src/test/search.url.js 파일이 실행됩니다.
```
yarn test-search
```

### Test select
- 검색하여 선택했을 때 선택 횟수를 저장하고 조회하는 모듈을 테스트 합니다.
- .src/test/select.test.js 파일이 실행됩니다.
```
yarn test-search
```

### Test all
- 전체 모든 기능을 test 할 때 사용합니다. 
- 'yarn test' = 'yarn test-search'+'yarn test-url'+ 'yarn test-select' 와 같습니다. 
```
yarn test
```

# 이해한 요구사항과 해결하기 위한 전략

1. 이해한 요구사항   
   - 프로그램 명세를 봤을 때 제가 생각한 요구사항의 우선순위혹은 중요도는 아래와 같습니다.  
      1. 검색 (검색어를 입력했을 때 정확하게 검색하는지)
      2. url 표시 (검색어와 db 자료구조 맞게 표시하는지 )
      3. UX
      4. UI 
   - 1, 2 에 관한 것은 평가대상으로 가점대상으로 그리고 테스트 코드까지 요구하고 있었기 때문입니다. 
   - 3, 4 번의 중요도가 떨어지는 것은 객관적으로 프로그램의 완성도를 판단하기가 쉽지 않아서 그렇다고도 생각했습니다. 

2.해결하기 위한 전략 
   - 과제 수행기간이 3일이라 비교적 능숙한 Vue framework 을 사용하였습니다.
   - UI, UX 에 우선순위가 낮기 때문에 autocomplete 이라는 기능을 직접 구현하기 보다는 기존에 구현된 것을 수정하기로 결정했습니다. 그래서 구글링을 통한 디지털 오션의 소스 (https://www.digitalocean.com/community/tutorials/vuejs-vue-autocomplete-component)  소스를 활용하여 프로그램에 맞게 수정하였습니다. 
   - 검색과 검색한 url 은 Jest lib 를 사용하여 테스트 케이스를 작성하여 테스트 케이스를 충족하도록 구현하였습니다. 
   - 테스트 케이스와 ui 가 동일한 로직으로 수행하도록 검색과 url 생성하는 부분을 소스코드로 구분하였습니다. 
   - 검색의 경우에는 내포된 케이스에도 동작해야하므로 재귀적인 호출방식을 사용했습니다. 다만 주어진 db.json 자료의 구조 depth가 깊지 않아서 선택했습니다. 만약 검색해야 하는 데이터의 자료구조의 depth가 깊어지고 혹은 순환참조가 발생하는 경우에는 코드의 변경을 해야 합니다. 
   

# 개선해야 하는 부분 
   - 검색을 하고 여러 건의 결과가 있을 때 아래화살표 키보드를 눌렀을 때 첫번째 결과가 선택되어야 하는데 두 번째 결과가 선택되는 현상이 있습니다. keydown.down 이 이벤트가 2번 발생하여 나타나는 현상인데 해결하지 못 했으나 기능에는 문제가 없고 높은 우선수위는 아닌 것 같아서 그대로 두었습니다.  
   - autocomplete 원래 소스 기능에는 비동기 검색도 지원하도록 코드가 만들어져 있으나 이 부분은 사용하지 않는데 아직 소스코드에는 남아 있습니다. 


