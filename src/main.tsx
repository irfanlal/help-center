import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css';
import i18n from './i18n';

const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
i18n.changeLanguage(savedLanguage);

createRoot(document.getElementById('root')!).render(<App />);
