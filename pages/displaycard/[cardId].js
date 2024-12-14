import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../components/global';

const DisplayCard = () => {
    const router = useRouter();
    const [cardData, setCardData] = useState({})
    const { cardId } = router.query;

    useEffect(() => {
        if (cardId) {
            console.log('cardid');
            (async () => {
                const res = await fetch(`${BASE_URL}/card/displaycard/${cardId}`)
                const cardData = await res.json()
                console.log({ cardData: cardData.cardData.totalValue });
                setCardData(cardData)
            })()
        }
    }, [cardId])

    if (!cardId) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Carte : {cardId}</h1>
            <p>Affichage des détails pour la carte.</p>
            {cardData.cardData && <p>{cardData.cardData.totalValue}</p>}
            {cardData.cardData && <p>{cardData.cardData.recipient}</p>}
            {cardData.cardData && <p>{cardData.cardData.message}</p>}
            {cardData.customer && <p>{cardData.customer.firstname}</p>}
            {cardData.customer && <p>{cardData.customer.lastname}</p>}
            {cardData.customer && <p>{cardData.customer.email}</p>}
        </div>
    );
};

export default DisplayCard;