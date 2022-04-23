import ReactDOM from 'react-dom';

import { App } from 'src/components/App';
import { reportWebVitals } from 'src/utils/reportWebVitals';

// Don't use createRoot!
// See https://github.com/facebook/react/issues/22839
ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
