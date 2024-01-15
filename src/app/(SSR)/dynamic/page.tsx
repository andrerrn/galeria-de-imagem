import { UnsplashImage } from "@/models/unsplash-image"
import Link from "next/link";
import { Alert, Image } from "react-bootstrap";


export const metadata = {
    title: "Busca dinâmica"
}


export const revalidate = 0;

export default async function Page() {
    const response = await fetch("https://api.unsplash.com/photos/random/?client_id=" + process.env.UNSPLASH_ACESS_KEY);
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width/ image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                Essa pagina <strong>Busca imagens de Unsplash API</strong>, sempre que atualizar a página, a imagem irá se alterar.
            </Alert>
            <Image 
            src={image.urls.raw}
            width={width}
            height={height}
            alt={image.description}
            className="rounded shadow mw-100 h-100"
            />
            Por <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    )
}