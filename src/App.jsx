import './styles/globals.scss';
import MainLayout from './layouts/MainLayout.jsx';
import Registration from './components/Registration/Registration.jsx';
import ExampleUseEffect from './components/hookExamples/ExampleUseEffect/ExampleUseEffect.jsx';

function App() {

    function testReg(user) {
        console.log(`REGISTRATION!\nUser name: ${user.name}\nUser password: ${user.password}`)
    }

    return (
        <MainLayout>
            {/* <Registration onSubmit={testReg} /> */}
            <ExampleUseEffect />
        </MainLayout>
  );
}

export default App;