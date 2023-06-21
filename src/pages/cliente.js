import React from 'react';
import Title from './../components/Title/index';
import SignUp from '../components/SignUp/index';

export default function Cliente() {
    return (
        <div>
            <Title
                title={"Criar uma conta"}
                text={"Complete os campos com as suas informações"} />
            <SignUp />
        </div>
    )
}