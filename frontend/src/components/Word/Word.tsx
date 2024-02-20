import {useState} from "react";

interface WordProps {
    children: string;
    onWordClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, word: string) => void;
}


const Word: React.FC<WordProps> = ({ children, onWordClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            style={{ fontWeight: isHovered ? 'bold' : 'normal', cursor: 'pointer' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => onWordClick(e, children)}
        >
      {children}{' '}
    </span>
    );
};

export default Word
