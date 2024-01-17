const Button: React.FC<{ onClick: () => void, text: string }> = ({ onClick, text }) => {
        return (
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
                {text}
            </button>
        );
    };

export default Button;