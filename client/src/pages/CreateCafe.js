import React from 'react'
import { MainBanner, Footer, CreateCafeForm } from 'components'


const CreateCafe = (props)=> {
    return (
        <div>
            <MainBanner/>
            <CreateCafeForm/>
            <Footer/>
        </div>
    )
}

export default CreateCafe