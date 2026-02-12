import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Pages
import { HomePage } from './pages/HomePage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { RefundPolicy } from './pages/RefundPolicy';
import { HelpFAQ } from './pages/HelpFAQ';
import { ContactUs } from './pages/ContactUs';
import { PlatformStatus } from './pages/PlatformStatus';
import { ResourcesPage } from './pages/ResourcesPage';
import { PricingPage } from './pages/PricingPage';
import { APIDocs } from './pages/APIDocs';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/help" element={<HelpFAQ />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/status" element={<PlatformStatus />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/api-docs" element={<APIDocs />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
