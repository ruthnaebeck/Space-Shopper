import React from 'react'

const App = ({ children }) => {
    return (
        <div>
            <h1> Space Shopper </h1>

            

            <div id='home'>
                {children}
            </div>
        </div>
    )
}

export default App;
