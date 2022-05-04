import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'
const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7a7dfe;
    }
`

const Formulario = ({ setMonedas }) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)
    const [moneda, SelectMonedas] = useSelectMonedas('Elije tu Moneda', monedas)
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas(
        'Elije tu Criptomoneda',
        criptos
    )

    useEffect(() => {
        const consultarAPI = async () => {
            const url =
                'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resp = await fetch(url)
            const { Data } = await resp.json()
            const arrayCriptos = Data.map((cripto) => {
                const { Name, FullName } = cripto.CoinInfo
                const objeto = {
                    id: Name,
                    nombre: FullName,
                }
                return objeto
            })

            setCriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }
        setError(false)
        setMonedas({ moneda, criptomoneda })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomonedas />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
