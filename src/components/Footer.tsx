import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-auto">
            <div className="container mx-auto text-center">
                <p>© 2024 My React App. All rights reserved.</p>
            </div>
        </footer>
    );
};

/*const footerStyle: React.CSSProperties = {
    backgroundColor: '#282c34',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
};*/
export default Footer;