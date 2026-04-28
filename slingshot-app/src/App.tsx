import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AgentChat from './components/AgentChat'
import WorkflowGrid from './components/WorkflowGrid'
import KnowledgeBase from './components/KnowledgeBase'
import WorkflowExecution from './components/WorkflowExecution'
import WorkflowEditor from './components/WorkflowEditor'
import DocumentEditor from './components/DocumentEditor'
import LandingPage from './components/LandingPage'

function DashboardLayout({ activeTab, children }: { activeTab: 'agent' | 'workflows' | 'kb'; children: React.ReactNode }) {
  return (
    <div className="flex w-full h-screen bg-[var(--color-bg-main)]" style={{ position: 'relative' }}>
      <Navbar activeTab={activeTab} />
      <main className="flex-1 min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  )
}

function PaddedLayout({ activeTab, children }: { activeTab: 'agent' | 'workflows' | 'kb'; children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen bg-[var(--color-bg-main)]">
      <Navbar activeTab={activeTab} />
      <main className="flex-1 min-w-0 px-16 py-16 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/" element={<DashboardLayout activeTab="agent"><AgentChat /></DashboardLayout>} />
      <Route path="/workflows" element={<PaddedLayout activeTab="workflows"><WorkflowGrid /></PaddedLayout>} />
      <Route path="/kb" element={<PaddedLayout activeTab="kb"><KnowledgeBase /></PaddedLayout>} />
      <Route path="/kb/:folderId" element={<PaddedLayout activeTab="kb"><KnowledgeBase /></PaddedLayout>} />
      <Route path="/workflow/:id/run" element={<WorkflowExecution />} />
      <Route path="/workflow/:id/edit" element={<WorkflowEditor />} />
      <Route path="/doc/:id" element={<DocumentEditor />} />
    </Routes>
  )
}
