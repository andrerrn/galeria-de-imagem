import { UnsplashUser } from "@/models/unsplash-users";
import { notFound } from "next/navigation";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
    params: {username: string},
}

async function getUser(username:string): Promise<UnsplashUser> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACESS_KEY}`);

    if (response.status === 404) {
        notFound();
    }

    return await response.json()
}

export async function generateMetadata({params: {username}}:PageProps): Promise<Metadata> {
    const user = await getUser(username);
    
    return {
        title: ([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username) + "galeria de imagem."
    }
    
}

export default async function Page({params: {username}}:PageProps) {
    const user = await getUser(username);

    return (
        <div>
            <Alert>
                Essa é a página de perfil do autor da imagem.
            </Alert>

            <h1>{user.username}</h1>
            <p>Primeiro Nome: {user.first_name}</p>
            <p>Sobrenome: {user.last_name}</p>
            <a href={"https://unsplash.com/" + user.username}>Perfil no Unsplash</a>

        </div>
    )

    
}