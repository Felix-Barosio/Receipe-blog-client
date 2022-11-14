import React from 'react'
import { Button } from './Button'

function Home() {
    return (
        <div>
            <div className='home-container'>
                <h1>Recipes Blog</h1>
                <p>What are you looking for?</p>
                <div className='home-btns'>
                    <Button
                        className='btns btn btn-primary'
                        buttonStyle='btn--outline'
                        buttonSize='btn--large'
                    >
                        GET STARTED
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home;