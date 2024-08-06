import './App.css';
import Footer from './Layouts/Footer/Footer';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';

import Loading from './Layouts/Loading/Loading';
import { useState } from 'react';
import ChatBot from './utils/ChatBot';

function App() {
    const [isLoading, setIsLoading] = useState(false);

    window.onload = function () {
        setIsLoading(false);
    };

    return (
        <div className="App">
            <Loading isLoading={isLoading} />
            <header>
                <Header />
            </header>

            <div>
                <ChatBot />
            </div>

            <main>
                <Main />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
