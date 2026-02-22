# 투썸오더 - 모바일 주문 앱 프로토타입

## 프로젝트 개요
투썸플레이스 모바일 주문 앱의 UI/UX 프로토타입. 순수 HTML/CSS/JS로 구현된 모바일 목업으로, 각 화면별 인터랙티브 프로토타입과 문서를 제공한다.

## 디렉토리 구조
```
twosomeplace/
├── input/                    # 참조 자료
│   ├── screenshot/           # 원본 앱 스크린샷 (참조용)
│   └── product/              # 제품 이미지 원본
├── ouput/                    # 산출물 (주의: "output"이 아닌 "ouput"으로 고정)
│   ├── common.css            # 공통 스타일
│   ├── menu-data.js          # 메뉴 데이터 (JS 객체)
│   ├── *.html / *.css        # 각 화면별 HTML/CSS
│   └── docs/                 # 화면별 설명서 (폰 목업 + 문서)
│       └── *-doc.html        # 설명서 파일
└── assets/
    └── images/               # 에셋 이미지
```

## 주요 화면
| 파일명 | 화면 | 설명서 |
|--------|------|--------|
| menu.html | 메뉴 목록 | docs/menu-doc.html |
| menu-detail.html | 메뉴 상세 | docs/menu-detail-doc.html |
| category-coffee.html | 커피 카테고리 | docs/category-coffee-doc.html |
| cart.html | 장바구니 | docs/cart-doc.html |
| order.html | 주문 내역 | docs/order-doc.html |
| order-detail.html | 주문 상세 | docs/order-detail-doc.html |
| favorites.html | 즐겨찾기 | docs/favorites-doc.html |
| store-select.html | 매장 선택 | docs/store-select-doc.html |

## 기술 스택
- **순수 HTML/CSS/JS** - 프레임워크 없음
- **모바일 퍼스트**: 375px 기준 (iPhone SE/8 사이즈)
- **한국어** 인터페이스

## 코딩 컨벤션

### HTML
- `lang="ko"` 사용
- viewport: `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`
- 공통 스타일은 `common.css` 링크, 페이지별 스타일은 별도 CSS 파일
- 시맨틱 태그 활용 (header, nav, main, section)
- 한국어 aria-label 사용

### CSS
- 전역 리셋: `* { margin:0; padding:0; box-sizing:border-box; }`
- 폰트: `-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic'` 시스템 폰트
- 기본 색상: `#222` (텍스트), `#f5f5f5` (배경)
- 브랜드 색상: 투썸플레이스 레드 계열
- 스크롤바 숨김 처리
- BEM 스타일이 아닌 직관적 클래스명 사용 (`.header-title`, `.btn-icon`, `.cart-badge`)

### JS
- `menu-data.js`: 전역 `MENU_DATA` 배열로 메뉴 데이터 관리
- 인라인 스크립트 허용 (프로토타입 특성상)

### 설명서 (docs/)
- 좌측: 폰 프레임 안에 iframe으로 실제 화면 임베드
- 우측: 화면 설명, 시나리오 플로우, UI 컴포넌트 문서
- 설명서는 self-contained (스타일 내장)

## 작업 규칙
1. **`ouput/` 폴더명을 수정하지 말 것** - 오타이지만 프로젝트 전체에서 이 경로를 사용 중
2. 새 화면 추가 시 반드시 대응하는 `docs/*-doc.html` 설명서도 함께 생성
3. `common.css` 수정 시 모든 화면에 영향이 있으므로 주의
4. 이미지 경로는 `../input/product/` 또는 `../assets/images/` 참조
5. 모든 UI 텍스트는 한국어로 작성
6. 응답도 한국어로 할 것
