import './styles/App.scss'
import Header from './components/layouts/header/Header'
import Modal from "./components/Modal/Modal"
import AudioPlayer from "./components/AudioPlayer/AudioPlayer"

function App() {

  return (
    <div className="App">
      <Header/>
      
      <main>
        <Modal>
          <AudioPlayer/>
        </Modal>
      </main>
    </div>
  );
}

export default App;
