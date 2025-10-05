import React, { useEffect, useState } from 'react';
import './loading.scss';

const Loading = () => {
    const [str, setStr] = useState("");

    useEffect(() => {
        const id = setInterval(() => {
            setStr((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 400);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="loading-component">
            Loading{str}
        </div>
    );
};

export default Loading;
