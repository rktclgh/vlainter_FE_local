import { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { BrowserSessionGuard } from './components/BrowserSessionGuard'
import './App.css'

const lazyNamedPage = (loader, exportName) =>
  lazy(() => loader().then((module) => ({ default: module[exportName] })))

const StartingPage = lazyNamedPage(() => import('./pages/StartingPage'), 'StartingPage')
const StudentLandingPage = lazyNamedPage(() => import('./pages/StudentLandingPage'), 'StudentLandingPage')
const Login = lazyNamedPage(() => import('./pages/auth/Login'), 'Login')
const Join = lazyNamedPage(() => import('./pages/auth/Join'), 'Join')
const ForgotPassword = lazyNamedPage(() => import('./pages/auth/ForgotPassword'), 'ForgotPassword')
const KakaoCallback = lazyNamedPage(() => import('./pages/auth/KakaoCallback'), 'KakaoCallback')
const TermsPage = lazyNamedPage(() => import('./pages/TermsPage'), 'TermsPage')
const PrivacyPolicyPage = lazyNamedPage(() => import('./pages/PrivacyPolicyPage'), 'PrivacyPolicyPage')
const ServiceIntroPage = lazyNamedPage(() => import('./pages/ServiceIntroPage'), 'ServiceIntroPage')
const InterviewStartPage = lazyNamedPage(() => import('./pages/content/InterviewStartPage'), 'InterviewStartPage')
const TechPracticePage = lazyNamedPage(() => import('./pages/content/TechPracticePage'), 'TechPracticePage')
const InterviewSessionPage = lazyNamedPage(() => import('./pages/content/InterviewSessionPage'), 'InterviewSessionPage')
const InterviewHistoryPage = lazyNamedPage(() => import('./pages/content/InterviewHistoryPage'), 'InterviewHistoryPage')
const InterviewHistoryDetailPage = lazyNamedPage(() => import('./pages/content/InterviewHistoryDetailPage'), 'InterviewHistoryDetailPage')
const PracticeHistoryPage = lazyNamedPage(() => import('./pages/content/PracticeHistoryPage'), 'PracticeHistoryPage')
const PracticeHistoryDetailPage = lazyNamedPage(() => import('./pages/content/PracticeHistoryDetailPage'), 'PracticeHistoryDetailPage')
const SavedQuestionsPage = lazyNamedPage(() => import('./pages/content/SavedQuestionsPage'), 'SavedQuestionsPage')
const QuestionSetsPage = lazyNamedPage(() => import('./pages/content/QuestionSetsPage'), 'QuestionSetsPage')
const QuestionBrowsePage = lazyNamedPage(() => import('./pages/content/QuestionBrowsePage'), 'QuestionBrowsePage')
const AdminConsolePage = lazyNamedPage(() => import('./pages/content/AdminConsolePage'), 'AdminConsolePage')
const PointChargeCallbackPage = lazyNamedPage(() => import('./pages/content/PointChargeCallbackPage'), 'PointChargeCallbackPage')
const PointChargePage = lazyNamedPage(() => import('./pages/content/PointChargePage'), 'PointChargePage')
const FileUploadPage = lazyNamedPage(() => import('./pages/content/FileUploadPage'), 'FileUploadPage')
const MyPage = lazyNamedPage(() => import('./pages/content/MyPage'), 'MyPage')
const ContentEntryPage = lazyNamedPage(() => import('./pages/content/ContentEntryPage'), 'ContentEntryPage')
const ServiceModePage = lazyNamedPage(() => import('./pages/content/ServiceModePage'), 'ServiceModePage')
const StudentHomePage = lazyNamedPage(() => import('./pages/content/StudentHomePage'), 'StudentHomePage')
const StudentCoursePage = lazyNamedPage(() => import('./pages/content/StudentCoursePage'), 'StudentCoursePage')
const StudentExamSessionPage = lazyNamedPage(() => import('./pages/content/StudentExamSessionPage'), 'StudentExamSessionPage')
const StudentWrongAnswerSetPage = lazyNamedPage(() => import('./pages/content/StudentWrongAnswerSetPage'), 'StudentWrongAnswerSetPage')
const ErrorPage = lazyNamedPage(() => import('./pages/ErrorPage'), 'ErrorPage')

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
    <p className="text-[14px] text-[#555]">페이지를 불러오는 중입니다...</p>
  </div>
)

const GuardedContentRoutes = () => (
  <BrowserSessionGuard>
    <Outlet />
  </BrowserSessionGuard>
)

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/campus" element={<StudentLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<ServiceIntroPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/content" element={<BrowserSessionGuard><ContentEntryPage /></BrowserSessionGuard>} />
        <Route path="/content/service-mode" element={<BrowserSessionGuard><ServiceModePage /></BrowserSessionGuard>} />
        <Route path="/content/student" element={<BrowserSessionGuard><StudentHomePage /></BrowserSessionGuard>} />
        <Route path="/content/student/courses/:courseId" element={<BrowserSessionGuard><StudentCoursePage /></BrowserSessionGuard>} />
        <Route path="/content/student/sessions/:sessionId" element={<BrowserSessionGuard><StudentExamSessionPage /></BrowserSessionGuard>} />
        <Route path="/content/student/wrong-answer-sets/:setId" element={<BrowserSessionGuard><StudentWrongAnswerSetPage /></BrowserSessionGuard>} />
        <Route path="/content/student/mypage" element={<BrowserSessionGuard><MyPage /></BrowserSessionGuard>} />
        <Route element={<GuardedContentRoutes />}>
          <Route path="/content/interview" element={<InterviewStartPage />} />
          <Route path="/content/tech-practice" element={<TechPracticePage />} />
          <Route path="/content/interview-history" element={<InterviewHistoryPage />} />
          <Route path="/content/interview-history/:sessionId" element={<InterviewHistoryDetailPage />} />
          <Route path="/content/practice-history" element={<PracticeHistoryPage />} />
          <Route path="/content/practice-history/:sessionId" element={<PracticeHistoryDetailPage />} />
          <Route path="/content/interview/session" element={<InterviewSessionPage />} />
          <Route path="/content/saved-questions" element={<SavedQuestionsPage />} />
          <Route path="/content/question-sets" element={<QuestionSetsPage />} />
          <Route path="/content/question-browse" element={<QuestionBrowsePage />} />
          <Route path="/content/files" element={<FileUploadPage />} />
          <Route path="/content/point-charge" element={<PointChargePage />} />
        </Route>
        <Route path="/content/admin" element={<BrowserSessionGuard><AdminConsolePage /></BrowserSessionGuard>} />
        <Route path="/content/mypage" element={<BrowserSessionGuard><MyPage /></BrowserSessionGuard>} />
        <Route path="/content/point-charge/callback" element={<PointChargeCallbackPage />} />
        <Route path="/errors/403" element={<ErrorPage code={403} />} />
        <Route path="/errors/404" element={<ErrorPage code={404} />} />
        <Route path="*" element={<ErrorPage code={404} />} />
      </Routes>
    </Suspense>
  )
}

export default App
