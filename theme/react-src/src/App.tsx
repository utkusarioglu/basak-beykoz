import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 dangerouslySetInnerHTML={{ __html: window.config.pageTitle }} />
        <a href="/wp-admin">visit wp-admin</a>
      </header>
    </div>
  );
}

export default App;
