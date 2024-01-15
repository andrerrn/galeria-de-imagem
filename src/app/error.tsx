"use client";

import { Button } from "react-bootstrap";

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}


export default function Errors({error, reset}: ErrorPageProps) {
    return(
        <div>
            <h1>Erro!</h1>
            <p>Alguma coisa aconteceu de errado!</p>
            <Button onClick={reset}>Tente Novamente</Button>
        </div>
    );
}