import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WorkflowGrid from './components/WorkflowGrid'
import KnowledgeBase from './components/KnowledgeBase'
import WorkflowExecution from './components/WorkflowExecution'
import WorkflowEditor from './components/WorkflowEditor'
import DocumentEditor from './components/DocumentEditor'
import LandingPage from './components/LandingPage'

function DashboardLayout({ activeTab, children }: { activeTab: 'workflows' | 'kb'; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg-main)]">
      <Navbar activeTab={activeTab} />
      <main className="flex-1 px-16 py-16">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/" element={<DashboardLayout activeTab="workflows"><WorkflowGrid /></DashboardLayout>} />
      <Route path="/kb" element={<DashboardLayout activeTab="kb"><KnowledgeBase /></DashboardLayout>} />
      <Route path="/kb/:folderId" element={<DashboardLayout activeTab="kb"><KnowledgeBase /></DashboardLayout>} />
      <Route path="/workflow/:id/run" element={<WorkflowExecution />} />
      <Route path="/workflow/:id/edit" element={<WorkflowEditor />} />
      <Route path="/doc/:id" element={<DocumentEditor />} />
    </Routes>
  )
}
