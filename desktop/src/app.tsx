import * as ReactDOM from 'react-dom/client';
import Pages from './pages';

function render() {
    ReactDOM.createRoot(document.getElementById("root")).render(<Pages />);
}

render();