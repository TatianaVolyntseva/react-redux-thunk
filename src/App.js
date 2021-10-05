import { useCallback, useEffect, useState } from 'react';
import Table from './components/Table'
import axios from './axiosConfig'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './components/Filter'
import FetchUsers from './components/FetchUsers'

function App() {

 const dispatch = useDispatch()

 const users = useSelector(state => state.syncReducer.users)
 const sortFilterUsers = useSelector(state => state.syncReducer.sortFilterUsers)
    
 const getData = useCallback(()=>{
   axios.get('/getTable')
     .then(({data}) => dispatch({type: "UPDATE_USERS", payload: data}))
     .catch(function (error) { console.log(error) })
 },[])

  useEffect(() => {
    if(users.length == 0) {
      getData()
    }
    
  },[getData])
  // console.log(store.getState())
  return (
    <div className="App">
      <div style={{margin: '20px'}}>Таблица клиентов банка:</div>
      <Filter/>
      {users.length>0&&<Table users={sortFilterUsers}/>}
      <FetchUsers/>
    </div>
  );
}

export default App;
