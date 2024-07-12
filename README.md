# PA - Pocket Art
## 포켓몬 팬아트 웹사이트
### 삼성 라이온즈 (B-10조)
<img src="https://github.com/user-attachments/assets/ed3c3a0a-40a8-4536-9a90-13df8657db54" />
<br>
<br>
<br>

## 팀원 소개
<table>
  <tbody>
    <tr>
      <th align="center"><b>팀원: 박유영</b></th>
      <th align="center"><b>팀원: 양대우</b></th>
      <th align="center"><b>팀원: 이수진</b></th>
      <th align="center"><b>팀원: 이세영</b></th>
      <th align="center"><b>팀장: 주현우</b></th>
    </tr>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/82076033?v=4" width="100px;" alt="박유영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/161686758?v=4" width="100px;" alt="양대우"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/59927808?v=4" width="100px;" alt="이수진"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/141402621?v=4" width="100px;" alt="이세영"/></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/37990421?v=4" width="100px;" alt="주현우"/></td>
     <tr/>
      <td align="center"><a href="https://github.com/Park-Yuyeong">@Park-Yuyeong</a></td>
      <td align="center"><a href="https://github.com/DAEWOOYANG0310">@DAEWOOYANG0310</a></td>
      <td align="center"><a href="https://github.com/leeejin">@leeejin</a></td>
      <td align="center"><a href="https://github.com/LeeSeaYoung">@LeeSeaYoung</a></td>
       <td align="center"><a href="https://github.com/HyunwooJu">@HyunwooJu</a></td>
    </tr>
  </tbody>
</table>

<br>

## 주요 기능
* 회원가입, 로그인, 로그아웃 구현
* 포켓몬 팬아트 CRUD 구현
* 포켓몬 이름별, 도감번호별 검색기능
* 커스텀 모달, toast 구현
* 게시글 클릭 시 상세페이지로
* 프로필사진, 닉네임 수정
* 좋아요 구현
* 좋아요한 게시물, 팬아트 쓴 게시물 불러오기
<br>

## ✔️ 프로젝트 요구사항
### (1) 필수 구현 사항

- [x]  Typescript, Next.js 적용
- [x]  redux 외의 클라이언트 전역상태관리 라이브러리 적용 (recoil, zustand, zotai 중 선택 권장)
    - zustand 사용
- [x]  supabase 를 사용하여 서버 및 DB 구현
- [x]  인증/인가 적용 (supabase authentication)
- [x]  - 모든 api 요청은 ~~반드시~~ 가급적 Route Handler 를 통해서 요청합니다.
    → 항상 route handler 를 거치는 것이 정답은 아닐 수 있으나 보안 및 CORS 회피의 장점을 우선적으로 생각하고 구현해보는 습관을 가지는 것이 권장됩니다.
    → Next.js의 Route Handler를 활용하여 간단한 API를 만들 수 있습니다. 클라이언트 컴포넌트에서 API 요청 시 API KEY를 숨기고 싶거나, 복잡한 로직을 Route Handler로 이동시켜 코드의 유지보수성을 높일 수도 있습니다.
- [x] 성능 최적화(수치)‼️

### (2) 선택요구사항
  #### 도전 과제

- [x]  클라이언트 컴포넌트에서 API 요청 시 Tanstack Query 활용하기
- [x]  React Query의 useInfiniteQuery 적용하기
- [ ]  React Query의 enabled와 select 옵션 사용하기
- [x]  useQuery의 queryKey 다양하게 사용하기
- [ ]  UI Library 활용하기
- [x]  Memoization 기법 사용하기
- [ ]  Next.js의 middleware 기능을 이용하여 인증 상태를 관리하기

## Stacks
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" /> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" />

<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visual studio code&logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
