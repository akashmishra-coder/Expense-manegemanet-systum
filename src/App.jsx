import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ExpenseHistory from './Pages/ExpenseHistory'
import AddTransactionModalWrapper from './Component/AddTransactionModalWrapper'
import CategoryPage from './Pages/CategoryPage'
import VendorPage from './Pages/VendorPage'
import VendorProfile from './Pages/VendorProfile'

const App = () => {
  return (
    <>
    <Router>
      <AddTransactionModalWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expense-history" element={<ExpenseHistory />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/vendors" element={<VendorPage />} />
        <Route path="/vendors/:id" element={<VendorProfile />} />
      </Routes>

    </Router>
    </>
  )
}

export default App;
