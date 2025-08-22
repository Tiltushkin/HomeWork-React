import './styles/globals.scss';
import MainLayout from './layouts/MainLayout.jsx';
import List from './components/List/List.jsx';
import Adder from './components/Adder/Adder.jsx';
import { useState } from 'react';
import Registration from './components/Registration/Registration.jsx';

function App() {
    // const [listData, setListData] = useState([])

    // function pushData(item) {
    //     setListData(prev => [...prev, item]);
    // }

    // function removeItem(indexToRemove) {
    //     setListData(prev => prev.filter((_, i) => i !== indexToRemove));
    // }

    function testReg(user) {
        console.log(`REGISTRATION!\nUser name: ${user.name}\nUser password: ${user.password}`)
    }

    return (
        <MainLayout>
            {/* <div>
                <Adder onSubmit={pushData} />
            </div>

            {listData.length > 0 ? (
                <div>
                <List items={listData} onDelete={removeItem} />
                </div>
            ) : (
                <p>Лист пустой</p>
            )} */}

            <Registration onSubmit={testReg} />
        </MainLayout>
  );
}

export default App;