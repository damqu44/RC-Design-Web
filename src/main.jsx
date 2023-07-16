import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ItemsProvider } from './Context/ItemsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ItemsProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ItemsProvider>
)
