# dundemo Frontend

> 이 프로젝트는 던전앤파이터 API를 활용하여 캐릭터 또는 모험단 단위의 레이드 클리어 횟수를 조회할 수 있는 React 기반 프론트엔드 애플리케이션입니다.
React와 TypeScript를 사용해 현대적인 프론트엔드 개발 방식을 학습하고, 향후 협업 과정에서 프론트엔드 개발자들과 원활하게 소통할 수 있도록 React의 핵심 개념과 기본 요소를 이해하는 데 중점을 두었습니다.

## 주요 기능

- **캐릭터 검색**: 특정 서버의 캐릭터 정보를 조회하고 레이드 클리어 횟수를 조회합니다.
- **모험단 검색**: 모험단에 속한 캐릭터 목록과 계정내 총 레이드 클리어 횟수를 조회합니다.
- **새로고침**: 모험단의 레이드 클리어 횟수를 갱신합니다.

## 기술 스택

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Styling**: CSS

## 프로젝트 구조

- **`src/main.tsx`**: `App` 컴포넌트를 렌더링하는 진입점 파일입니다.
- **`src/App.tsx`**: 애플리케이션의 전체적인 레이아웃과 상태를 관리하는 최상위 컴포넌트입니다. `useSearch` 커스텀 훅을 통해 데이터를 관리하고, 검색 결과에 따라 적절한 컴포넌트를 렌더링합니다.
- **`src/api/apiClient.tsx`**: `axios` 인스턴스를 생성하고, API 요청을 위한 기본 URL과 헤더를 설정합니다. `.env` 파일의 `VITE_APP_API_BASE_URL` 환경 변수를 기본 URL로 사용합니다.
- **`src/hooks/searchHooks.tsx`**: 이 애플리케이션의 핵심 로직이 담겨있는 커스텀 훅(`useSearch`)입니다.
  - API 요청에 필요한 파라미터(카테고리, 서버명, 캐릭터/모험단명)를 관리합니다.
  - API 통신 중 `loading` 상태와 `error` 상태를 관리합니다.
  - 검색 성공 시 `characterCards` 또는 `adventureClearCount` 상태에 결과 데이터를 저장합니다.
  - 마지막 검색 조건을 기억하여 `refresh` 함수 호출 시 재검색을 수행합니다.
- **`src/components/`**: 각 UI 요소를 담당하는 컴포넌트들이 위치합니다.
- **`src/types/`**: 프로젝트 전반에서 사용되는 TypeScript 인터페이스와 타입을 정의합니다.

## 작동 흐름

1.  **카테고리 선택**: 사용자는 '캐릭터' 또는 '모험단' 검색 카테고리를 선택합니다.
2.  **검색어 입력**: 선택된 카테고리에 따라 `SearchBar` 컴포넌트에서 서버명과 캐릭터명 또는 모험단명을 입력합니다.
3.  **검색 실행 (`onSearch`)**: '조회' 버튼을 클릭하면 `App` 컴포넌트의 `handelSearch` 함수가 실행됩니다.
4.  **API 호출 (`executeSearch`)**: `handelSearch` 함수는 `useSearch` 훅의 `executeSearch` 함수를 호출하여 본격적인 데이터 요청을 시작합니다.
    - `loading` 상태가 `true`로 변경되고, UI에 "로딩 중..." 메시지가 표시됩니다.
    - 선택된 카테고리에 따라 `/api/v1/character/count` 또는 `/api/v1/adventure` 엔드포인트로 `POST` 요청을 보냅니다.
5.  **상태 업데이트**: API 응답을 받으면 `useSearch` 훅은 `characterCards` 또는 `adventureClearCount` 상태를 업데이트합니다.
6.  **결과 렌더링**: `App` 컴포넌트는 업데이트된 상태를 감지하고, `CharacterCard` 또는 `AdventureResult` 컴포넌트를 사용하여 검색 결과를 화면에 렌더링합니다.
7.  **오류 처리**: API 요청 중 오류가 발생하면 `error` 상태가 업데이트되고, 에러 메시지가 화면에 표시됩니다.
8.  **새로고침 (`refresh`)**: '새로고침' 버튼을 클릭하면 `useSearch` 훅에 저장된 마지막 검색 파라미터를 사용하여 `executeSearch` 함수를 다시 호출합니다.
