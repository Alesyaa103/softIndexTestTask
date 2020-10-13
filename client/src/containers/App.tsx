import React from "react";
import { Provider } from 'react-redux';
import FormSection from './FormSection';
import TableSection from './TableSection';
import store from '../store';

function App() {
  return (
    <main className="App">
      <Provider store={store}>
        <div className="root">
          <TableSection />
          <FormSection />
        </div>
      </Provider>
    </main>
  );
}

export default App;
