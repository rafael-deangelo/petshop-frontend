import React from 'react'
import Title from "../components/Title";
import Checkout from '../components/Checkout';

export default function Pedido() {
    return (
        <div>
            <Title 
            title={"Checkout"}
            text={"Finalize seu pedido"} />
            <Checkout />
        </div>
    )
}