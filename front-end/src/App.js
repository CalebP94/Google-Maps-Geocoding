
import './App.css';
import Map from './Map';
import Layout from './Layout';
import Table from './Table';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useLoadScript } from '@react-google-maps/api';

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDienyZ6LR0VlXwoDKREjQx4IUpEwmZpB8",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Map />} />
            <Route path="Tables/*" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}



