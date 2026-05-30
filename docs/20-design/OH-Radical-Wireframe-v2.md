# OH Radical — 메인 페이지 MVP 와이어프레임 구조 설계서 v2.0

> **문서 성격:** 내부 공유용 / 외주 제작 청사진 / 개발·디자인 참고용
> **기준:** UX Flow Strategy v2.0 + 메인 시안 (2026-0528.png)
> **뷰포트 기준:** Desktop 1440px / Mobile 390px
> **핵심 방향 전환:** Dark Tech → Light Clean Air Platform

---

## 📐 v2 설계 원칙

```
1. 빛이 먼저다        → 배경은 흰색에서 시작. 어두워지지 않는다.
2. 여백이 신뢰다       → 정보를 줄여서 공간이 숨쉬게 한다.
3. 색은 포인트만       → Mint/Cyan은 핵심 강조에만 사용
4. 기술은 아름답게     → 복잡한 3D 없이 SVG 기류 시각화
5. 모바일은 독립적으로 → 데스크탑 축소가 아닌 재구성
```

---

## 🎨 v2 디자인 토큰

```
배경 계열:
  bg-base:       #FFFFFF  (기본 배경)
  bg-subtle:     #F7FAF9  (섹션 구분용 연한 배경)
  bg-mint-light: #EFF8F5  (기술/강조 섹션 배경)
  bg-footer:     #E8EFED  (푸터)

텍스트 계열:
  text-primary:  #0D1117  (메인 헤드라인)
  text-body:     #3D4F4A  (본문)
  text-muted:    #8A9E99  (보조, 레이블)

포인트 컬러:
  mint-core:     #2EC9A0  (로고 OH, 주요 CTA, 아이콘)
  mint-light:    #72DFC3  (보조 강조)
  mint-subtle:   #B8EFE1  (배경 포인트, 아이콘 배경)

경계선:
  border-subtle: rgba(0, 0, 0, 0.06)
  border-light:  rgba(0, 0, 0, 0.10)

그림자:
  shadow-card:   0 2px 16px rgba(0, 0, 0, 0.06)
  shadow-nav:    0 1px 0 rgba(0, 0, 0, 0.06)

타이포그래피:
  Display:  72~80px / -0.02em / line-height 1.05
  H1:       52~64px / -0.015em / line-height 1.1
  H2:       36~48px / -0.01em / line-height 1.2
  H3:       24~28px / line-height 1.3
  Body:     16~18px / line-height 1.75 / color text-body
  Label:    12~13px / 0.08em letter-spacing / uppercase / text-muted
```

---

## 🗂️ 전체 섹션 구조 Overview

| # | 섹션 ID | 섹션명 | 높이 | Sticky | MVP 우선도 |
|---|---|---|---|---|---|
| 0 | `nav` | Global Navigation | 72px 고정 | ✅ | P0 |
| 1 | `hero` | Hero | 100vh | - | P0 |
| 2 | `concept-bar` | 4-Concept Bar | 180px | - | P0 |
| 3 | `why-air` | Why Clean Air | 100vh × 4 | ✅ (내부) | P0 |
| 4 | `technology` | Technology | 100vh × 3 | ✅ (내부) | P1 |
| 5 | `solutions` | Industry Solutions | 100vh | - | P1 |
| 6 | `proof` | Proof & Data | 100vh × 1.5 | - | P1 |
| 7 | `philosophy` | Brand Philosophy | 80vh | - | P2 |
| 8 | `cta` | Final CTA | 100vh | - | P0 |
| 9 | `footer` | Footer | Auto | - | P0 |

---

## Section 0. Global Navigation

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  [OH]Radical    Technology  Solutions  Applications  Research  About Us    KR ∨  ≡  │
│  ← 좌 고정         ← ───────────── 중앙 메뉴 ──────────────── →   ← 우측 →  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
  높이: 72px
  패딩: 좌우 80px (desktop)
```

### 컬러 & 스타일

```
초기 상태 (Hero 위):
  배경: transparent
  로고 "OH": mint-core (#2EC9A0)
  로고 "Radical": text-primary (#0D1117)
  메뉴 텍스트: text-body (#3D4F4A)

스크롤 후 (72px+):
  배경: #FFFFFF + box-shadow: 0 1px 0 rgba(0,0,0,0.06)
  → CSS transition: background 0.3s ease
```

### 메뉴 Hover 처리

```
메뉴 항목 Hover:
  → 텍스트 컬러: text-body → mint-core 전환 (0.15s)
  → 언더바 없음 (깔끔하게)
```

### 모바일 대응

```
┌─────────────────────────────────────┐
│  [OH]Radical              KR  [≡]  │
└─────────────────────────────────────┘

햄버거 탭 시:
  → 풀스크린 흰 오버레이 (z-index 최상단)
  → 메뉴 항목 세로 대형 리스트
  → 하단: 문의하기 버튼 (mint-core 배경)
  → [×] 닫기 버튼 (우상단)
```

### 정보 밀도 가이드
- 메뉴 5개 이하 (드롭다운 없음 — MVP)
- 로고 워드마크만 (서브타이틀 불필요)

---

## Section 1. Hero

### 레이아웃 구조 (Desktop)

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  ←──────── 좌측 텍스트 50% ────────→  ←── 우측 비주얼 50% ──────→  │
│                                                                    │
│  Invisible Protection. Visible Trust.  [연한 민트 텍스트, 소형]   │
│                                                                    │
│  We Engineer                           [배경: 밝은 클린 공간 사진] │
│  the [Air] You Trust     ←대형→        [기기 + 민트 기류 SVG 오버] │
│                                        [OH 분자 뱃지 float]       │
│  OH Radical은 보이지 않는 기술로                                   │
│  공기 중 유해물질과 바이러스를                                      │
│  근본적으로 분해하여                                               │
│  더 안전하고 건강한 공간을 만듭니다.                               │
│                                                                    │
│  [Discover Technology  >]   ▶ Watch Video                         │
│                                                                    │
│                                    ↓ Scroll                       │
└────────────────────────────────────────────────────────────────────┘
  전체 높이: 100vh
  좌측 패딩: 80px~120px
```

### 레이어 구조 상세

```
Layer 1 — 전체 배경:
  색상: bg-base (#FFFFFF) ~ 우측으로 갈수록 배경 이미지 블렌드
  우측 절반: 밝은 클린 인테리어 이미지 (자연광, 흰 공간)
  이미지 좌측 경계: linear-gradient(to right, #fff 30%, transparent 70%)
  → 텍스트 영역 좌측은 항상 순백으로 가독성 확보

Layer 2 — 기류 SVG:
  기기 주변: 부드러운 민트 웨이브 곡선 3~4개
  SVG path, stroke: mint-light (#72DFC3), opacity 0.6~0.8
  CSS animation: dashoffset 기반 드로잉 또는 translateX 루프
  → MVP: 간단한 CSS keyframe loop (3~4초 주기)

Layer 3 — OH 분자 뱃지:
  원형 배지 (60~80px), 배경: mint-core
  텍스트: "OH" 흰색, 볼드
  위치: 기기 우측 상단
  animation: translateY(-6px) ↔ 0, 3s ease-in-out infinite (gentle float)

Layer 4 — 텍스트:
  키커: "Invisible Protection. Visible Trust." / 13px / mint-core / letter-spacing 0.06em
  헤드라인: "We Engineer\nthe Air You Trust" / 72px / text-primary
    → "Air": mint-core (#2EC9A0)
  서브카피: 16px / text-body / line-height 1.8 / 최대 너비 380px
  CTA 그룹: 헤드라인 하단 48px

Layer 5 — Scroll 인디케이터:
  우측 하단 고정 (또는 중앙 하단)
  "Scroll" 텍스트 + 세로 선 (40px) + 아래 방향 점 이동 애니메이션
  컬러: text-muted (#8A9E99)
```

### CTA 버튼 스타일

```
[Discover Technology  >]:
  border: 1.5px solid text-primary (#0D1117)
  background: transparent
  text: text-primary
  padding: 14px 28px
  border-radius: 4px (거의 직각 — 테크 감성)
  hover: background #0D1117, text #FFFFFF (0.2s)

[▶ Watch Video]:
  텍스트 링크 스타일
  앞에 ▶ 삼각형 아이콘 (14px, text-muted)
  hover: text mint-core
```

### 진입 애니메이션 (MVP — 순수 CSS)

```
0ms      배경 이미지 Fade In (0 → 1, 600ms)
200ms    키커 텍스트 Fade In (opacity 0→1, 500ms)
400ms    헤드라인 1행 (opacity 0→1, 600ms)
600ms    헤드라인 2행 (동일, stagger)
800ms    서브카피 (opacity 0→1, 500ms)
1000ms   CTA 그룹 (opacity 0→1, 400ms)
1400ms   스크롤 인디케이터 (opacity 0→1, 400ms)
```

### 모바일 대응

```
┌─────────────────────────────────────┐
│                                     │
│  (배경: 밝은 공간 이미지, 화면 꽉참) │
│  (다크 오버레이 없이 — 밝은 이미지)  │
│                                     │
│  Invisible Protection.              │
│  Visible Trust.                     │
│                                     │
│  We Engineer                        │
│  the Air                            │
│  You Trust                          │
│                                     │
│  [서브카피 2줄로 축약]               │
│                                     │
│  [Discover Technology  >]           │
│  ▶ Watch Video                      │
│                                     │
└─────────────────────────────────────┘

모바일: 텍스트 좌측 정렬, 배경 이미지 전체 커버 (opacity 0.15 밝게)
헤드라인: 48px
하단 Floating CTA Bar 없음 (Hero는 풀 화면 경험 우선)
```

### 정보 밀도 가이드
- 좌측 텍스트 영역 절대 과밀 금지
- 서브카피 최대 3줄 (40자 이내/줄)
- 우측 비주얼 영역에 텍스트 없음

---

## Section 2. 4-Concept Bar

### 레이아웃 구조

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ [아이콘]         │  │ [아이콘]         │  │ [아이콘]         │  │ [아이콘]         │  │
│  │ Decompose       │  │ Purify          │  │ Convert         │  │ Protect         │  │
│  │ 유해물질·바이러스│  │ 공기질 실시간   │  │ 물(H₂O)로 전환  │  │ 지속 가능한     │  │
│  │ 분해            │  │ 정화            │  │                 │  │ 안심 공간       │  │
│  │ Learn more >    │  │ Learn more >    │  │ Learn more >    │  │ Learn more >    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
  높이: 180~200px
  배경: bg-subtle (#F7FAF9) 또는 #FFFFFF에 상단 border 1px
  패딩: 좌우 80px
```

### 카드 상세 구조

```
각 카드 (너비 25%):
  패딩: 32px 24px
  구분: 우측 border 1px, border-subtle

  [아이콘]: 32×32px, 민트 컬러 선형 아이콘
  [제목]: "Decompose" / 16px / font-weight 600 / text-primary
  [한글 설명]: 13px / text-muted / margin-top 4px
  [Learn more >]: 13px / mint-core / margin-top 12px
    → hover: 화살표 3px 우측 이동 (transform translateX)
```

### Hover 처리

```
카드 hover:
  배경: bg-mint-light (#EFF8F5)
  transition: background 0.2s ease
  → 테두리 변화 없음 (깔끔하게)
```

### 모바일 대응

```
→ 4개 카드 → 2×2 그리드
→ 각 카드 높이 약간 증가
→ Learn more 링크: 유지
```

---

## Section 3. Why Clean Air

### 레이아웃 구조 (Sticky Scroll)

```
[섹션 전체 높이: 100vh × 4 = 400vh]
[내부 sticky 컨테이너: 100vh]

┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-subtle (#F7FAF9)                                          │
├──────────────────────────────────┬──────────────────────────────────┤
│  [좌: 텍스트 영역 45%]           │  [우: 비주얼 영역 55%]           │
│  패딩: 80px 좌, 60px 상하        │  패딩: 없음 (이미지 엣지까지)     │
│                                  │                                  │
│  [레이블]                         │                                  │
│  AIR QUALITY  01 / 04            │  [밝은 공간 이미지]              │
│                                  │  (오피스, 학교, 병원 등)         │
│  Airborne viruses                │                                  │
│  spread without                  │  이미지 위 오버레이:             │
│  warning.                        │  - 연한 민트 아이콘 (소형)      │
│                                  │  - 해당 위험 요소 시각화         │
│  [본문 텍스트 2~3줄]              │  (복잡한 파티클 없이            │
│                                  │   단순한 아이콘/라인 그래픽)     │
│  ──────────────────              │                                  │
│  ●○○○ 진행 인디케이터            │                                  │
│                                  │                                  │
└──────────────────────────────────┴──────────────────────────────────┘
```

### 4개 항목 구성

```
항목 1: Airborne Viruses
  좌: 텍스트
  우: 밝은 오피스/복도 이미지 + 공중 부유 입자 아이콘 오버레이 (단순 SVG)

항목 2: VOC / 유해가스
  좌: 텍스트
  우: 밝은 신축 공간 이미지 + 화학 분자 아이콘 (소형)

항목 3: 악취
  좌: 텍스트
  우: 급식실/주방 공간 이미지 (밝은 버전) + 물결 라인 아이콘

항목 4: 미세먼지
  좌: 텍스트
  우: 창문 있는 공간 이미지 + PM2.5 점 그래픽 (연하게)
```

### 텍스트 구조 (각 항목)

```
[레이블: "AIR QUALITY  01 / 04"]
  → 12px / uppercase / letter-spacing 0.08em / text-muted / mint-core 숫자

[헤드라인: 48px / text-primary / line-height 1.1]
  "Airborne viruses
   spread without warning."

[본문: 16px / text-body / line-height 1.8 / 최대 2~3줄]
  "밀폐된 공간에서 공기 중 바이러스는..."

[구분선: 1px / border-subtle / 너비 40px / margin-top 32px]

[진행 인디케이터: ●○○○]
  → 채워진 원 (mint-core) + 빈 원 (border-subtle)
  → 클릭 가능 (해당 항목으로 점프)
```

### 우측 이미지 처리

```
이미지 스타일:
  border-radius: 0 (엣지까지 꽉 차게)
  filter: brightness(1.05) saturate(0.9) — 약간 더 밝고 채도 낮게
  
오버레이:
  해당 항목 아이콘: 이미지 중앙 또는 관련 위치에 소형 아이콘
  배경: rgba(mint, 0.05) — 거의 보이지 않는 수준

전환:
  항목 변경 시: opacity 0 → 1 (0.4s ease) + 미세한 scale(1.02 → 1)
```

### 배경 처리

```
섹션 전체: bg-subtle (#F7FAF9)
좌측 텍스트 영역: 흰 배경 패널 (약간의 깊이감)
우측 비주얼: 배경 없음, 이미지 자체가 배경

섹션 최상단:
  "The Air Around You." 섹션 타이틀 → 상단 80px 영역, 중앙 or 좌측 정렬
  → 섹션 진입 시에만 표시, 이후 sticky 콘텐츠로 교체
```

### 모바일 대응

```
→ Sticky Scroll → Swipe Carousel로 전환
→ 상하 레이아웃: 이미지(60vw 높이) → 텍스트
→ 하단 점 인디케이터 (탭 가능)
→ 배경: bg-subtle 유지
```

---

## Section 4. Technology

### 레이아웃 구조 (3-Panel Sticky Scroll)

```
[섹션 전체 높이: 100vh × 3 = 300vh]
[내부 sticky 컨테이너: 100vh]

┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-mint-light (#EFF8F5)  ← Technology 섹션만 민트 배경       │
│                                                                     │
│  How It Works.          ← 섹션 타이틀 (상단 좌측, 소형)            │
│  보이지 않는 반응, 보이는 결과.                                      │
│                                                                     │
├──────────────────────────────────┬──────────────────────────────────┤
│  [좌: 텍스트 40%]                │  [우: 기술 다이어그램 60%]        │
│  패딩: 80px                      │                                  │
│                                  │  [밝은 기술 시각화]              │
│  [레이블] STEP 01 / 03           │                                  │
│                                  │  - 흰 배경 카드 위 SVG 다이어그램│
│  CNT generates                   │  - 민트 기류 웨이브 곡선         │
│  OH Radical.                     │  - 분자 연결 선 그래픽           │
│                                  │  - 데이터 카드 (소형)            │
│  [본문 2~3줄]                    │                                  │
│                                  │                                  │
│  [데이터 카드]                    │                                  │
│  ┌──────────────────────────────┐│                                  │
│  │ Reaction time   < 0.3 sec   ││                                  │
│  │ Byproduct       H₂O only    ││                                  │
│  └──────────────────────────────┘│                                  │
│                                  │                                  │
│  ─────  01 / 03  ─────           │                                  │
└──────────────────────────────────┴──────────────────────────────────┘
```

### 3개 패널 구성

```
Panel 1: Generate — CNT → OH Radical 생성
  좌: 설명 + 데이터 카드 (반응 속도, 생성 효율)
  우: CNT 육각형 구조 SVG + 민트 기류 웨이브

Panel 2: React — OH Radical 공간 확산
  좌: 설명 + "Active vs Passive" 비교 미니 다이어그램
  우: 공간 전체에 기류가 퍼지는 간단한 SVG 플로우 다이어그램

Panel 3: Convert — H₂O 전환
  좌: 설명 + "The only byproduct is water." 강조
  우: 분자 반응 3단계 플로우 (·OH → Virus → H₂O) — 단순 SVG
```

### 비주얼 구성 상세

```
우측 다이어그램 영역:
  배경 카드: #FFFFFF + border-radius 16px + box-shadow: 0 4px 24px rgba(0,0,0,0.06)
  카드 내부: 각 패널 SVG 다이어그램

기류 SVG 스타일:
  곡선: stroke mint-light (#72DFC3), stroke-width 1.5, opacity 0.7
  파티클: fill mint-subtle (#B8EFE1), r 3~6px
  → CSS animation: 곡선은 stroke-dashoffset 루프
  → 파티클: scale + opacity 펄스 (2~3s 주기)

데이터 카드 스타일:
  배경: bg-subtle (#F7FAF9) 또는 #FFFFFF
  테두리: 1px border-subtle
  폰트: Monospace (숫자) + Sans-serif (레이블)
  레이블: text-muted (12px uppercase)
  수치: text-primary (20px, font-weight 600)
```

### 섹션 배경

```
전체 배경: bg-mint-light (#EFF8F5)
→ Why Clean Air 섹션(bg-subtle)에서 자연스러운 전환
→ 민트 배경이 "기술 섹션"임을 자연스럽게 구분
→ 텍스트는 다크 컬러로 가독성 확보
```

### 모바일 대응

```
→ Sticky Scroll → 일반 수직 스크롤 (3개 패널 위아래 나열)
→ 상하 레이아웃: 다이어그램(카드) → 텍스트
→ 데이터 카드: 텍스트 하단 인라인 배치
→ 배경 유지 (bg-mint-light)
```

---

## Section 5. Industry Solutions

### 레이아웃 구조 (시안 참조 — 좌우 분할)

```
┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-base (#FFFFFF)                                            │
├──────────────────────────┬──────────────────────────────────────────┤
│  [좌: 텍스트 고정 30%]   │  [우: 이미지 슬라이더 70%]              │
│  패딩: 80px 좌           │                                          │
│                          │  ┌─────┐  ┌─────┐  ┌─────┐  ┌────      │
│  (SOLUTIONS 레이블)      │  │스마트│  │ 의료│  │공항 │  │ 학 ...   │
│  다양한 환경에           │  │  팜  │  │기관 │  │터미 │  │ 교 ...   │
│  최적화된 솔루션         │  │     │  │     │  │  널  │  │  ...   │
│                          │  └─────┘  └─────┘  └─────┘  └────      │
│  OH Radical 기술은 다양한│                          ▶ (화살표)     │
│  공간의 특성을 고려하여  │                                          │
│  최적의 공기질을         │  ┌─────────┬──────────┬──────────┬─────┐ │
│  제공합니다.             │  │[아이콘] │ [아이콘] │ [아이콘] │ ... │ │
│                          │  │Smart    │ Hospital │ Airport  │     │ │
│  [View All Solutions >]  │  │Farm     │ 의료기관 │ 공항·터미│     │ │
│                          │  │스마트팜 │          │  널      │     │ │
│                          │  └─────────┴──────────┴──────────┴─────┘ │
└──────────────────────────┴──────────────────────────────────────────┘
```

### 이미지 슬라이더 상세

```
이미지 슬라이더 (우측 상단 영역):
  보이는 이미지: 한 번에 3.5개 (우측 마지막 잘림 → "더 있음" 유도)
  이미지 크기: 각 240px × 300px, border-radius 12px
  간격: 12px
  ▶ 화살표: 우측 끝, 흰 원형 배경, 민트 화살표 아이콘

이미지 처리:
  기본: 자연광 밝은 공간 사진, 약간 desaturate
  hover: 원래 채도로 복원 (0.3s) + 이미지 위 민트 overlay 0.1

공간 카테고리 탭 (슬라이더 하단):
  아이콘 + 공간명 + 한글 설명 (시안 방식 그대로)
  선택된 탭: 아이콘 mint-core / 텍스트 강조
  비선택 탭: text-muted
  탭 클릭 시 슬라이더 해당 위치로 이동
```

### 좌측 텍스트 고정 구조

```
[레이블 "SOLUTIONS"]
  12px / uppercase / mint-core / letter-spacing 0.1em

[헤드라인]
  36~40px / text-primary / line-height 1.2
  "다양한 환경에\n최적화된 솔루션"

[서브카피]
  15px / text-body / line-height 1.7 / 최대 너비 280px

[CTA 버튼]
  [View All Solutions  >]
  → 아웃라인 버튼 (border text-primary, bg transparent)
  → margin-top: 40px
```

### 모바일 대응

```
→ 상하 레이아웃 (텍스트 → 슬라이더)
→ 텍스트: 좌측 정렬
→ 이미지 슬라이더: 한 번에 1.2개 노출 (가로 스크롤)
→ 카테고리 탭: 가로 스크롤 (overflow-x auto)
```

---

## Section 6. Proof & Data

### 레이아웃 구조

```
[섹션 높이: 약 100vh × 1.5]

─── 상단: KPI Bar (시안 하단 구조 참조) ───────────────────────────────

┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-base (#FFFFFF)                                            │
│                                                                     │
│  검증된 기술로              [아이콘] 99.99%   [아이콘] 24/7         │
│  신뢰할 수 있는 성과를      바이러스 제거 효율  연속 공기 정화       │
│  만듭니다.                                                          │
│                            [아이콘] 0         [아이콘] 40+          │
│                            2차 오염물질 발생    글로벌 적용 프로젝트 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

─── 중단: 레퍼런스 케이스 ────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-subtle (#F7FAF9)                                          │
│  패딩: 80px 상하 / 80px 좌우                                        │
│                                                                     │
│  [레이블 "CASE STUDIES"]                                            │
│                                                                     │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────┐  │
│  │  [공간 이미지]    │  │  [공간 이미지]    │  │  [공간 이미지]│  │
│  │  200px 높이       │  │                   │  │               │  │
│  ├───────────────────┤  ├───────────────────┤  ├───────────────┤  │
│  │  인천국제공항     │  │  공공의료시설     │  │  스마트팜     │  │
│  │  ─────────────    │  │                   │  │               │  │
│  │  바이러스 99.99%  │  │  교차감염 0건     │  │  수확량 +30%  │  │
│  │  저감 달성        │  │                   │  │               │  │
│  │  자료 보기 >      │  │  자료 보기 >      │  │  자료 보기 >  │  │
│  └───────────────────┘  └───────────────────┘  └───────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

─── 하단: 인증 배지 행 ──────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────┐
│  [로고 흑백]   [로고 흑백]   [로고 흑백]   [로고 흑백]             │
│  hover → 원래 컬러                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### KPI 수치 영역 레이아웃

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  검증된 기술로          │  [방패 아이콘]  99.99%                     │
│  신뢰할 수 있는         │               바이러스 제거 효율           │
│  성과를 만듭니다.       │                                            │
│                         │  [바람 아이콘]  24/7                       │
│                         │               연속 공기 정화              │
│  (본문 텍스트)          │                                            │
│                         │  [잎 아이콘]   0                           │
│                         │               2차 오염물질 발생            │
│                         │                                            │
│                         │  [지구 아이콘]  40+                        │
│                         │               글로벌 적용 프로젝트         │
└─────────────────────────────────────────────────────────────────────┘

비율: 좌 35% (타이틀) / 우 65% (수치 2×2 그리드)

수치 스타일:
  아이콘: 28px, mint-core 컬러
  숫자: 48~56px / font-weight 700 / text-primary
  설명: 13px / text-muted
  카운터 애니메이션: 뷰포트 진입 시 (유지)
```

### 케이스 카드 스타일

```
각 카드:
  border-radius: 12px
  overflow: hidden
  background: #FFFFFF
  box-shadow: shadow-card (0 2px 16px rgba(0,0,0,0.06))

이미지: 상단 200px, object-fit cover, 밝은 공간 사진
콘텐츠 영역 패딩: 24px
  - 기관명: 16px / font-weight 600
  - 결과 수치: 14px / text-body / border-left 2px mint-core / padding-left 8px
  - "자료 보기 >": 13px / mint-core
```

### 모바일 대응

```
KPI 영역: 좌우 → 상하 (타이틀 → 2×2 그리드)
케이스 카드: 가로 스크롤 슬라이더 (1.2개 노출)
인증 배지: 가로 스크롤 (overflow-x auto)
```

---

## Section 7. Brand Philosophy

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-mint-light (#EFF8F5) 또는 bg-base                         │
│  섹션 높이: 80vh                                                    │
│  패딩: 상하 120px / 좌우 max-width 800px 중앙 정렬                  │
│                                                                     │
│                                                                     │
│                  Human First.                                       │
│                  Earth Always.                                      │
│                                                                     │
│          기술보다 사람이 먼저입니다.                                 │
│          화학약품 없이, 폐기물 없이, 오직 자연의 원리로.             │
│          사람이 숨쉬는 공간을 더 건강하게,                          │
│          우리가 살아가는 지구를 더 오래 지속시키는 것.              │
│          그것이 OH Radical이 존재하는 이유입니다.                   │
│                                                                     │
│          Human First · Sustainable Innovation · Smart Manufacturing │
│          Future Agriculture · Practical Technology · Heritage       │
│                                                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 타이포그래피 처리

```
슬로건 "Human First. Earth Always.":
  크기: 56~64px / font-weight 700 / text-primary
  정렬: 중앙
  "Earth Always." → "Always" 또는 전체 민트 컬러 강조 (옵션)

선언문:
  크기: 16~18px / text-body / line-height 1.9
  정렬: 중앙 / max-width 520px

핵심 가치 키워드:
  크기: 12px / letter-spacing 0.06em / text-muted
  구분자: · (중간점)
```

### 진입 애니메이션 (MVP)

```
뷰포트 진입 시 순서:
  1. 슬로건 Fade In (opacity 0→1, 0.8s)
  2. 선언문 Fade In, delay 0.3s (0.6s)
  3. 키워드 행 Fade In, delay 0.6s (0.5s)

translateY 없음 — 순수 opacity만 (가장 정제된 방식)
```

---

## Section 8. Final CTA

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-base (#FFFFFF) 또는 bg-mint-light (#EFF8F5)               │
│  섹션 높이: 100vh                                                   │
│                                                                     │
│                 Start the Conversation.                             │
│                 지금, 첫 대화를 시작하세요.                          │
│                                                                     │
│         공간의 규모, 산업 분야에 관계없이                            │
│         OH Radical 전문가가 최적의 솔루션을 제안합니다.              │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  회사명 _______________________   담당자명 ________________  │   │
│  │                                                              │   │
│  │  이메일 _______________________   연락처   ________________  │   │
│  │                                                              │   │
│  │  도입 분야  [선택해주세요  ▼]                                │   │
│  │                                                              │   │
│  │  문의 내용 (선택)                                            │   │
│  │  ____________________________________________________________│   │
│  │                                                              │   │
│  │                                   [문의하기  →]             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│         ✓ 무료 현장 컨설팅     ✓ 7일 내 연락     ✓ 인천공항 레퍼런스│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 폼 스타일 상세

```
폼 컨테이너:
  background: #FFFFFF
  border-radius: 16px
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.08)
  padding: 48px

폼 필드:
  기본 상태: border-bottom 1.5px solid border-subtle
  focus 상태: border-bottom 1.5px solid mint-core (#2EC9A0)
  배경: transparent
  라벨: 12px / text-muted / uppercase / letter-spacing 0.06em
  입력 텍스트: 15px / text-primary
  transition: border-color 0.2s ease

드롭다운:
  appearance: none (커스텀 스타일)
  배경에 ▼ 아이콘 (mint-core)

전송 버튼 [문의하기 →]:
  background: mint-core (#2EC9A0)
  color: #FFFFFF
  padding: 16px 40px
  border-radius: 4px
  font-weight: 600
  hover: background #22B090 (약간 어둡게)
  transition: 0.2s ease
```

### 상단 빠른 CTA 3개 (폼 위)

```
┌────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  📋 도입 문의하기  │  │  📄 기술 자료 받기  │  │  💬 빠른 상담      │
└────────────────────┘  └─────────────────────┘  └─────────────────────┘

→ 3개 아웃라인 버튼 (border border-light, bg transparent)
→ 클릭: 폼 포커스 / PDF 다운로드 / 외부 링크
→ 선택: 선택된 버튼 border mint-core로 변경
```

### 신뢰 문구 행

```
✓ 무료 현장 컨설팅   ✓ 7일 내 담당자 연결   ✓ 인천공항 납품 레퍼런스

폰트: 13px / text-muted
✓ 체크: mint-core
간격: 각 항목 사이 48px
```

### 모바일 대응

```
→ 폼 필드 세로 1열 배치
→ 3개 빠른 CTA 버튼: 세로 배치
→ 신뢰 문구: 세로 나열
→ 폼 컨테이너 패딩: 48px → 24px
```

---

## Section 9. Footer

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│  배경: bg-footer (#E8EFED)                                          │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  상단 행 (패딩 60px):                                               │
│  [OH]Radical              Technology    Solutions                   │
│  Human First.             Applications  Research                   │
│  Earth Always.            About Us      Contact                     │
│                           Privacy Policy                            │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  하단 행 (패딩 24px, 구분선 상단):                                   │
│  © 2025 OH Radical. All rights reserved.   [LinkedIn] [YouTube]    │
│  서울특별시 ... | 사업자: ... | 대표: ...        [KR] [EN]          │
└─────────────────────────────────────────────────────────────────────┘
```

### 컬러 처리

```
배경: #E8EFED (연한 민트-그레이 — 전체 라이트 테마 마무리)
텍스트: text-body (#3D4F4A)
로고 "OH": mint-core 유지
링크 hover: mint-core
구분선: border-subtle
SNS 아이콘: text-muted → hover mint-core
```

---

## 📱 모바일 총괄 대응 방침 (v2)

```
브레이크포인트:
  Desktop:  1280px+ (설계 기준 1440px)
  Tablet:   768px ~ 1279px
  Mobile:   390px ~ 767px

v2 모바일 핵심 원칙:
  1. 밝은 배경 유지 — 모바일도 동일하게 라이트 모드
  2. Sticky Scroll → Swipe/Carousel 전환
  3. 폰트 크기 스케일 다운 (Display 72→48px, H1 52→36px)
  4. 좌우 패딩: 24px 고정
  5. 이미지는 항상 텍스트 위에 배치

Floating Bottom CTA Bar (모바일 전용 — P2):
┌─────────────────────────────────────────┐
│  [문의하기]            [기술 자료 받기] │  ← 하단 고정 24px 높이 바
└─────────────────────────────────────────┘
  배경: #FFFFFF / box-shadow: 0 -1px 0 rgba(0,0,0,0.06)
  → MVP에서는 선택적 (P2 이월 가능)
```

---

## 🏗️ MVP 구현 우선순위 (v2 기준)

```
P0 — 필수 구현:
  ├── Navigation (Sticky + 라이트 모드 전환)
  ├── Hero (라이트 배경 + 기류 SVG + 타이포 애니메이션)
  ├── 4-Concept Bar (정적 카드 4개 + hover)
  ├── Why Clean Air (Sticky Scroll 4단계)
  ├── Final CTA (컨택 폼 완성)
  └── Footer

P1 — Phase 1 내 목표:
  ├── Technology (정적 SVG 다이어그램 3패널)
  ├── Industry Solutions (이미지 슬라이더 + 카테고리 탭)
  ├── Proof & Data (카운터 애니메이션 + 케이스 카드)
  └── Brand Philosophy (Fade-in)

P2 — Phase 2 이월:
  ├── Hero 기류 SVG 고도화 (Lottie)
  ├── Technology Lottie 애니메이션
  ├── 모바일 Floating CTA Bar
  └── Watch Video 기능 (비디오 플레이어)
```

---

## 🔧 기술 구현 가이드라인 (v2)

```
Framework:      Next.js (App Router)
Styling:        Tailwind CSS v3 + CSS Modules (커스텀 필요 구간)
Animation:      Framer Motion (진입 애니메이션)
                CSS keyframes (SVG 기류, float 효과)
Scroll:         Intersection Observer API (Sticky Scroll)
SVG 기류:       직접 제작 (Figma Export) 또는 디자이너 협업
이미지 슬라이더: Swiper.js (MVP)
폼:             React Hook Form + Resend (이메일 발송)
아이콘:         Lucide React (통일)
폰트:           추천 — Inter (본문) + Neue Haas Grotesk 또는 Suit (한글)
```

---

## 🚫 v2 금지 사항

```
컬러:
  ❌ 짙은 다크 배경 사용 (어떤 섹션도)
  ❌ 보라/파랑 그라데이션
  ❌ 형광 Cyan (너무 강한 포인트 컬러)
  ❌ 색상 과다 사용 (민트 포인트만)

레이아웃:
  ❌ 정보 과밀 섹션
  ❌ 제품 스펙 표(Table) 노출
  ❌ 슬라이드 배너 자동재생

비주얼:
  ❌ SF 다크 파티클 시스템
  ❌ 복잡한 Three.js 3D (MVP 단계)
  ❌ 어둡고 무거운 장비 사진
  ❌ 실험실 장비 중심 이미지

카피:
  ❌ "최강", "압도적", "혁명" 류의 과장 표현
  ❌ 위협/공포 유발 메시지
  ❌ 가격/사양 나열
```

---

*© OH Radical — Wireframe Structure Document v2.0*
*기준: UX Flow v2.0 + 메인 시안 (2026-0528.png)*
*대상: 내부 공유 / 외주 개발사 청사진 / 디자이너 핸드오프*
