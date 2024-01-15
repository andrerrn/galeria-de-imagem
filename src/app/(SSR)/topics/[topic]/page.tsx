import { UnsplashImage } from "@/models/unsplash-image"
import { Alert, Image } from "react-bootstrap";
import  styles  from "./TopicPage.module.css";
import { title } from "process";
import { Metadata } from "next";

interface PageProps {
    params: {topic: string},
    // searchParams: {[key: string]: string | string[] | undefined}
}

export function generateMetadata({params: {topic}}: PageProps): Metadata {
    return {
        title:  topic + " - galeria de imagem"
    }
}

export function generateStaticParams() {
    return ["girls", "gym", "tecnology"].map(topic => ({ topic }));
}

export default async function Page({params: {topic}}: PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACESS_KEY}`);
    const images: UnsplashImage[] = await response.json();

    return(
        <div>
            <Alert>
                Essa pagina <strong>Busca imagens de Unsplash API</strong>, irá trazer as imagens do tópico que você escolher.
            </Alert>
            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image
                        src={image.urls.raw}
                        width={150}
                        height={150}
                        alt={image.description}
                        key={image.urls.raw}
                        className={styles.image}
                        />
                )

                )
            }
        </div>
    )
}