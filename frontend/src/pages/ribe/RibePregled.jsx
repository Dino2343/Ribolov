import { useEffect, useState } from "react"
import RibaService from "../../services/RibaService"
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";



export default function RibePregled(){

    const [ribe, setRibe] = useState([]);
    const navigate = useNavigate();

    async function dohvatiPlesove() {
        try {
            const odgovor = await RibaService.get();
            console.log('Odgovor s API-ja:', odgovor); // Debug
            if (odgovor && odgovor.data) {
                setRibe(odgovor.data);
            } else {
                console.warn('Nema podataka u odgovoru:', odgovor);
            }
        } catch (error) {
            console.error('Greška prilikom dohvata podataka:', error);
        }
    }
    // hook (kuka) se izvodi prilikom dolaska na stranicu Ribe

    useEffect(()=>{
        dohvatiPlesove();
    }, [])

    function obrisi(sifra)
    {
        if(!confirm('Sigurno odbrisati'))
        {
            return;
        }

        obrisi(sifra);
    }

    async function obrisi(sifra) {
        const odgovor = await RibaService.obrisi(sifra);
        if(odgovor.greska)
            {
                alert(odgovor.poruka)
                return
            }        
            dohvatiPlesove();
    }

    return(
        <>
        <Link
        to={RouteNames.RIBE_NOVI}
        className="btn btn-success siroko"
        >Dodaj novu ribu</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>
                        Naziv
                    </th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {ribe && ribe.map((riba,index)=>(
                    <tr key={index}>
                        <td>
                            {riba.naziv}
                        </td>
                        <td>
                            <Button onClick={()=>navigate(`/ribe/${riba.sifra}`)}>
                                Promjena
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button 
                            variant="danger"
                            onClick={()=>obrisi(riba.sifra)}>
                                Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )



}