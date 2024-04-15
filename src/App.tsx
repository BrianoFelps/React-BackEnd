import axios from 'axios';
import { ChangeEvent, useState } from 'react';
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

  // async = assincrono, para que não trave o sistema, rodando em segundo plano
  const handleGetUsers = async () => {
    const res = await axios.get("http://localhost:8080/users");

    setUsers(res.data);
  }

  const handleAddOrUpdteUser = async () =>{
    if (selectedId < 0) {
      await axios.post("http://localhost:8080/users", {
        nome: userName
      });

      alert(`${userName} inserido adequadamente`);

      handleGetUsers();

      setUserName("")
    }else{
      await axios.put("http://localhost:8080/users", {
        id: selectedId,
        nome: userName
      });

      alert ('Usuário alterado com êxito');

      handleGetUsers();

      setUserName("");
      setSelectedId(-1);
    }
  }

  // Usados só para API'S
  const handleSelectUser = (id: number) => {
    const user = users.find((user: User) => user.id === id);

    if(user){
      setUserName(user.nome);
      setSelectedId(user.id);
    }
  }

  const handleDeleteUser = async (id: number) =>{
    // O url usa, após o "?", o id.
    await axios.delete(`http://localhost:8080/users?id=${id}`);

    alert("Usuário removido com êxito")

    handleGetUsers();
  }

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  return (
    <>
      <input placeholder='Digite o nome aqui' onChange={handleOnInputChange}
      value={userName.length > 0 ? userName : ""} type="text"/>

      <button onClick={handleAddOrUpdteUser}>Salvar</button>
      <button onClick={handleGetUsers}>Listar</button>

      <table style={{margin: "100px 0"}}>
        <tbody>
          <tr>
            <th>ID</th>
            <th style={{width: "500px"}}>NOME</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>
                <button onClick={() => {handleDeleteUser(user.id)}}>Remover</button>  
              </td>
              <td>
                <button onClick={() => {handleSelectUser(user.id)}}>Alterar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
