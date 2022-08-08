const generateToken = () => {
    let token = ''

    for (let i = 0; i<5; i++){
        let x = Math.floor(Math.random()*10)
        token += x
    }
    return token
}


export {generateToken}