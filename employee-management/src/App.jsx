import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import EmployeeTable from './Components/EmployeeTable';
import { useTheme } from './ThemeContext';

function App() {
  const { darkMode } = useTheme();

  return (
    <div data-bs-theme={darkMode ? "dark" : "light"} 
      className={darkMode ? "dark-mode" : "light-mode"}>
      <Header />
      <br/>
      <EmployeeTable />
    </div>
  );
}

export default App;
