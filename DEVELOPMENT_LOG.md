# 개발 일지

## 프로젝트 개요
*   **프로젝트명:** Caravan 공유 앱 (app-caraban)
*   **개발 기간:** 2025년 11월 21일 ~ (현재 진행 중)
*   **목표:** 카라반 공유 플랫폼의 MVP(최소 기능 제품) 구현을 위한 클린 아키텍처 기반 Node.js(TypeScript) 백엔드 환경 설정 및 핵심 도메인 모델 설계.

## 개발 과정

### Week 1 (2025년 11월 21일)

#### Day 1 - 프로젝트 기획 및 초기 환경 설정, 도메인 모델 설계

**작업 내용:**
1.  새로운 Node.js(TypeScript) 클린 아키텍처 프로젝트 환경 설정.
    *   Node.js 프로젝트 초기화.
    *   TypeScript 및 관련 개발 의존성 설치 (`typescript`, `ts-node`, `@types/node`, `ts-node-dev`).
    *   `tsconfig.json` 설정.
    *   `src/models`, `src/services`, `src/repositories`, `src/exceptions` 디렉토리 구조 생성.
    *   간단한 `src/index.ts` 파일 생성.
    *   `Dockerfile` 및 `docker-compose.yml` 파일 생성.
    *   `package.json`에 빌드 및 실행 스크립트(`build`, `start`, `start:dev`) 추가.
2.  SRP 원칙에 따라 `User`, `Caravan`, `Payment`, `Review` 도메인 모델 클래스 설계 및 `src/models` 폴더에 구현.
    *   각 클래스에 Phase 1 요구사항(`사용자 관리`, `카라반 정보`, `결제`, `리뷰`)에 기반한 속성 포함.
3.  Git 저장소 초기화, `.gitignore` 파일에 `.env` 추가.
4.  초기 환경 설정 및 모델 클래스 설계 내용을 GitHub에 커밋 및 푸시.

**Gemini CLI 사용 프롬프트:**
*   "새로운 Caravan 프로젝트를 위해 Node.js(TypeScript) 환경을 클린 아키텍처 구조로 설정해 줘. src/models, services, repositories, exceptions 폴더를 포함해야 하며, Dockerfile과 docker-compose.yml 파일을 생성해 줘."
*   "Git을 초기화하고 .gitignore에 .env 파일을 반드시 포함하여 API 키 노출을 막아줘. 이후 초기 파일들을 'Initial setup' 커밋으로 GitHub에 Push 해 줘."
*   "**SRP 원칙**을 지켜 User, Caravan, Payment, Review 모델 클래스를 'src/models'에 설계해 줘. **Phase 1.1 사용자 관리** (호스트/게스트 구분, 신뢰도 필드), **Phase 1.2 카라반 정보**, **Phase 1.4 결제**, **Phase 1.5 리뷰** 관련 속성을 모두 포함해 줘."
*   "이제 커밋하고 푸시해줘 (AI-assisted)를 넣어서"

**결과 및 수정사항:**
*   Node.js 프로젝트 초기화 및 TypeScript 개발 환경 구축 성공.
*   클린 아키텍처 구조 (`src/models`, `src/services`, `src/repositories`, `src/exceptions`) 폴더 생성.
*   Docker 환경 (`Dockerfile`, `docker-compose.yml`) 설정 완료.
*   `User`, `Caravan`, `Payment`, `Review` 모델 클래스 정의 및 `src/models` 디렉토리에 파일 생성 완료. 각 클래스는 SRP 원칙을 준수하고 필수 속성들을 포함함.
*   Git 저장소 초기화 및 `.gitignore` 설정 완료.
*   두 차례의 커밋 (`Initial setup`, `feat: Design model classes (AI-assisted)`) 및 GitHub 푸시 성공.
*   특별한 수정사항 없이 요구사항대로 진행됨.

**학습 내용:**
*   Node.js 및 TypeScript 프로젝트의 초기 설정 방법과 `tsconfig.json`의 중요성.
*   클린 아키텍처의 기본적인 폴더 구조 (모델, 서비스, 리포지토리, 예외) 이해.
*   SRP(단일 책임 원칙)를 모델 설계에 적용하는 방법.
*   Docker 및 Docker Compose를 이용한 개발 환경 컨테이너화의 기본.
*   Git을 이용한 버전 관리 및 GitHub 연동 과정.

**AI 활용:**
*   복잡한 초기 환경 설정 과정을 단계별로 자동화하여 시간 절약.
*   요구사항에 맞춰 SRP를 준수하는 도메인 모델 클래스 설계 및 코드 생성.
*   Git 명령어 실행 및 커밋/푸시 작업을 대행하여 효율적인 버전 관리 지원.
