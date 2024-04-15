import { useState } from 'react';
import './App.css'

interface User{
  id: number;
  nome: string;
}

function App() {
  // Guardar lista de usuarios
  const [users, setUsers] = useState<User[]>([]);
  // Manipular campo de testo para novo nome de usuario ou alteração
  const [userName, setUserName] = useState("");
  // Guardar Id selecionado
  const [selectedId, setSelectedId] = useState(-1)

  const getUsers = async () => {

  }

  const handleAddOrUpdteUser = async () =>{
  
  }

  const handleSelectUser = async (id: number) => {
  
  }

  const handleDeleteUser = async (id: number) =>{
  
  }

  return (
    <>
      
    </>
  )
}

export default App
