"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Image, Spinner } from "react-bootstrap";
import  styles  from "./Search.module.css";

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null> (null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingError, setSearchResultsLoadingError] = useState(false);

    async function handlesubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if (query) {
            try {
                setSearchResults(null);
                setSearchResultsLoadingError(false);
                setSearchResultsLoading(true);
                const response = await fetch("/api/search?query="+query);
                const images: UnsplashImage[] = await response.json();
                setSearchResults(images);
            } catch (error) {
                console.error(error);
            } finally {
                setSearchResultsLoading(false);
            }
            
        }
    }
    
    
    return (
        <div>
            <Alert>
                Essa pagina <strong>Busca imagens de Unsplash API</strong>, pesquise o tipo de foto que você deseja.
            </Alert>
            
            <Form onSubmit={handlesubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label> Pesquisa de Imagens</Form.Label>
                    <Form.Control
                        name="query"
                        placeholder="Cachorros, academia, viagem ..."
                        />
                    
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Pesquisa</Button>

                <div className="d-flex flex-column align-items-center">
                    {searchResultsLoading && <Spinner animation="border" />}
                    {searchResultsLoadingError && <p>Algo aconteceu de errado, tente novamente.</p>}
                    {searchResults?.length === 0 && <p>Nada foi encontrado, tente uma pesquisa diferente.</p>}
                </div>

                {searchResults &&
                    <>
                        { searchResults.map(image => (
                            <Image
                                src={image.urls.raw}
                                width={150}
                                height={150}
                                alt={image.description}
                                key={image.urls.raw}
                                className={styles.image}
                                />
                        ))

                        }
                    </>

                }
            </Form>
        </div>
    )
}