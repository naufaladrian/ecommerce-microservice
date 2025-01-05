import { goto } from "$app/navigation";

export default function reloadPage() {
    const thisPage = window.location.pathname;

    console.log('goto ' + thisPage);

    goto('/').then(
        () => goto(thisPage)
    );
}